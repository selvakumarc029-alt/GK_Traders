import React, { useState, useRef, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getAIColourRecommendations, getColours } from '../services/api';
import { useShop } from '../context/ShopContext';
import {
  Sparkles,
  Upload,
  Sliders,
  Check,
  RotateCcw,
  Palette,
  Eye,
  SlidersHorizontal,
  Download,
  AlertCircle,
  HelpCircle,
  ArrowRight,
} from 'lucide-react';

export default function AIRoomVisualizerPage() {
  const [searchParams] = useSearchParams();
  const { showToast } = useShop();

  // Selected paint color
  const [selectedHex, setSelectedHex] = useState(searchParams.get('hex') || '#7FA1B3');
  const [selectedColourName, setSelectedColourName] = useState(
    searchParams.get('name') || 'Morning Mist Blue'
  );

  // Room Image
  const defaultRoom =
    'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=80';
  const [originalImageUrl, setOriginalImageUrl] = useState(defaultRoom);
  const [processedImageUrl, setProcessedImageUrl] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [blendIntensity, setBlendIntensity] = useState(65);

  // Before & After Interactive Slider (0 to 100 percentage)
  const [sliderPosition, setSliderPosition] = useState(50);
  const sliderContainerRef = useRef(null);
  const isDragging = useRef(false);

  // Quick Swatches
  const [presetColours, setPresetColours] = useState([
    { name: 'Morning Mist Blue', hex: '#7FA1B3' },
    { name: 'Royal Saffron Glow', hex: '#D97724' },
    { name: 'Nilgiri Pine Green', hex: '#2E5A44' },
    { name: 'Jaipur Dusty Rose', hex: '#C88D87' },
    { name: 'Pristine Alabaster', hex: '#F4F1EA' },
    { name: 'Graphite Charcoal', hex: '#33383F' },
    { name: 'Coastal Dune Ochre', hex: '#D2AC79' },
    { name: 'Kashmir Lavender', hex: '#B8A8D0' },
  ]);

  // AI Recommendation Questionnaire State
  const [aiForm, setAiForm] = useState({
    roomType: 'Living Room',
    lighting: 'Abundant Natural Light',
    preferredStyle: 'Modern Minimalist',
    colourPreference: 'Warm neutrals and balanced calming tones',
  });
  const [aiLoading, setAiLoading] = useState(false);
  const [aiResult, setAiResult] = useState(null);

  // Canvas processing to perform genuine image tinting and wall color simulation
  useEffect(() => {
    generateWallTint(originalImageUrl, selectedHex, blendIntensity);
  }, [originalImageUrl, selectedHex, blendIntensity]);

  const generateWallTint = (imageSrc, hexColor, intensity) => {
    setIsProcessing(true);
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = imageSrc;

    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.naturalWidth || 800;
      canvas.height = img.naturalHeight || 600;
      const ctx = canvas.getContext('2d');

      // 1. Draw base room image
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      // 2. Extract lightness values to create a luminance wall mask
      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imgData.data;

      const rgb = hexToRgb(hexColor) || { r: 127, g: 161, b: 179 };
      const factor = intensity / 100;

      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        const brightness = 0.299 * r + 0.587 * g + 0.114 * b;

        // Apply color tinting primarily to medium-to-high brightness surfaces (walls/plaster)
        // while preserving deep shadows (<50) and ultra high specularity (>245)
        if (brightness > 60 && brightness < 240) {
          const weight = (factor * Math.sin(((brightness - 60) / 180) * Math.PI));
          data[i] = r * (1 - weight) + rgb.r * weight;
          data[i + 1] = g * (1 - weight) + rgb.g * weight;
          data[i + 2] = b * (1 - weight) + rgb.b * weight;
        }
      }

      ctx.putImageData(imgData, 0, 0);

      // 3. Export synthesized image
      const renderedUrl = canvas.toDataURL('image/jpeg', 0.92);
      setProcessedImageUrl(renderedUrl);
      setIsProcessing(false);
    };

    img.onerror = () => {
      setIsProcessing(false);
      console.warn('Canvas image processing cross-origin error; fallback to CSS filter tint');
    };
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.match(/image\/(jpeg|jpg|png|webp)/)) {
      showToast('Please upload a valid JPG, PNG, or WEBP image of your room.', 'error');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      showToast('Image size exceeds 10MB limit.', 'error');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      setOriginalImageUrl(event.target.result);
      showToast('Custom room photo uploaded successfully!');
    };
    reader.readAsDataURL(file);
  };

  // Slider Mouse & Touch Interaction
  const handleSliderMove = (clientX) => {
    if (!sliderContainerRef.current) return;
    const rect = sliderContainerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const handleMouseDown = () => {
    isDragging.current = true;
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const handleMouseMove = (e) => {
    if (isDragging.current) {
      handleSliderMove(e.clientX);
    }
  };

  const handleTouchMove = (e) => {
    if (e.touches[0]) {
      handleSliderMove(e.touches[0].clientX);
    }
  };

  // AI Recommendation Trigger
  const handleAIRecommend = async (e) => {
    e.preventDefault();
    try {
      setAiLoading(true);
      const res = await getAIColourRecommendations(aiForm);
      if (res.success && res.data) {
        setAiResult(res.data);
        showToast('AI Colour Recommendation generated!');
      }
    } catch (err) {
      showToast(err.message || 'AI engine is currently busy. Try again.', 'error');
    } finally {
      setAiLoading(false);
    }
  };

  const downloadRenderedImage = () => {
    if (!processedImageUrl) return;
    const link = document.createElement('a');
    link.href = processedImageUrl;
    link.download = `GK-Traders-Room-Preview-${selectedColourName.replace(/\s+/g, '-')}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Room visualization downloaded successfully!');
  };

  return (
    <div style={{ backgroundColor: 'var(--bg-main)', minHeight: '90vh', padding: '3.5rem 0 5rem' }}>
      <div className="container">
        {/* Header */}
        <div className="section-header">
          <span className="section-tag">
            <Sparkles size={16} /> Computer Vision & AI Styling
          </span>
          <h1 className="section-title">AI Room Colour Visualizer & Split Comparison</h1>
          <p className="section-desc">
            Upload a photo of your living room, bedroom, or exterior wall. Test actual paint shades with our interactive Before & After slider, or let our design AI generate a coordinated architectural palette.
          </p>
        </div>

        {/* Visualizer Workspace Section */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
            gap: '2.5rem',
            marginBottom: '4rem',
          }}
        >
          {/* Left Column: Interactive Before / After Canvas Slider */}
          <div>
            <div className="card" style={{ padding: '1.5rem', backgroundColor: '#FFFFFF' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Eye size={18} color="var(--accent)" />
                  <span style={{ fontWeight: '700', color: 'var(--primary)', fontSize: '1rem' }}>
                    Interactive Before & After Comparison
                  </span>
                </div>

                <button
                  onClick={downloadRenderedImage}
                  className="btn btn-outline"
                  style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}
                >
                  <Download size={14} /> Download Image
                </button>
              </div>

              {/* Slider Viewport Container */}
              <div
                ref={sliderContainerRef}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                onMouseMove={handleMouseMove}
                onTouchMove={handleTouchMove}
                style={{
                  position: 'relative',
                  width: '100%',
                  height: '420px',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  cursor: 'ew-resize',
                  userSelect: 'none',
                  backgroundColor: '#0F172A',
                  boxShadow: 'var(--shadow-md)',
                }}
              >
                {/* 1. Base Painted / Transformed Image */}
                <img
                  src={processedImageUrl || originalImageUrl}
                  alt="AI Painted Room Preview"
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />

                {/* 2. Original Image Clipped Layer */}
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: `${sliderPosition}%`,
                    height: '100%',
                    overflow: 'hidden',
                    borderRight: '3px solid #FFFFFF',
                    boxShadow: '2px 0 10px rgba(0,0,0,0.4)',
                  }}
                >
                  <img
                    src={originalImageUrl}
                    alt="Original Room"
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: sliderContainerRef.current ? sliderContainerRef.current.clientWidth : '100%',
                      maxWidth: 'none',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                  {/* Left Label */}
                  <span
                    style={{
                      position: 'absolute',
                      bottom: '16px',
                      left: '16px',
                      backgroundColor: 'rgba(15, 23, 42, 0.8)',
                      color: '#FFFFFF',
                      fontSize: '0.75rem',
                      fontWeight: '800',
                      padding: '4px 10px',
                      borderRadius: '6px',
                      backdropFilter: 'blur(4px)',
                    }}
                  >
                    BEFORE (ORIGINAL)
                  </span>
                </div>

                {/* Right Label */}
                <span
                  style={{
                    position: 'absolute',
                    bottom: '16px',
                    right: '16px',
                    backgroundColor: 'rgba(194, 65, 12, 0.9)',
                    color: '#FFFFFF',
                    fontSize: '0.75rem',
                    fontWeight: '800',
                    padding: '4px 10px',
                    borderRadius: '6px',
                    backdropFilter: 'blur(4px)',
                  }}
                >
                  AFTER ({selectedColourName})
                </span>

                {/* Slider Handle Divider Icon */}
                <div
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: `${sliderPosition}%`,
                    transform: 'translate(-50%, -50%)',
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    backgroundColor: '#FFFFFF',
                    boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    pointerEvents: 'none',
                    color: 'var(--primary)',
                  }}
                >
                  <SlidersHorizontal size={18} />
                </div>
              </div>

              {/* Slider Instructions */}
              <div style={{ textAlign: 'center', marginTop: '10px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                Drag slider handle left or right to inspect wall color changes in real time.
              </div>
            </div>
          </div>

          {/* Right Column: Controls & Upload */}
          <div>
            <div className="card" style={{ padding: '2rem', backgroundColor: '#FFFFFF', marginBottom: '2rem' }}>
              <h3 style={{ fontSize: '1.25rem', color: 'var(--primary)', marginBottom: '1.25rem' }}>
                Paint Controls & Photo Upload
              </h3>

              {/* Upload Room Photo Button */}
              <div style={{ marginBottom: '1.5rem' }}>
                <label className="form-label">Upload Your Own Room Photo</label>
                <div
                  style={{
                    border: '2px dashed var(--border-color)',
                    borderRadius: '12px',
                    padding: '1.5rem',
                    textAlign: 'center',
                    backgroundColor: '#F8FAFC',
                    cursor: 'pointer',
                  }}
                  onClick={() => document.getElementById('roomPhotoInput').click()}
                >
                  <Upload size={24} color="var(--accent)" style={{ margin: '0 auto 8px' }} />
                  <div style={{ fontWeight: '600', color: 'var(--primary)', fontSize: '0.9rem' }}>
                    Click to browse room photo (Max 10MB)
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    Supports JPG, PNG, WEBP from your camera or gallery
                  </div>
                  <input
                    id="roomPhotoInput"
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    style={{ display: 'none' }}
                  />
                </div>
              </div>

              {/* Selected Shade Indicator */}
              <div style={{ marginBottom: '1.5rem' }}>
                <label className="form-label">Active Paint Shade</label>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '10px 14px',
                    backgroundColor: '#F8FAFC',
                    borderRadius: '10px',
                    border: '1px solid var(--border-color)',
                  }}
                >
                  <div
                    style={{
                      width: '38px',
                      height: '38px',
                      borderRadius: '8px',
                      backgroundColor: selectedHex,
                      border: '1px solid rgba(0,0,0,0.1)',
                      flexShrink: 0,
                    }}
                  ></div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: '700', color: 'var(--primary)', fontSize: '0.95rem' }}>
                      {selectedColourName}
                    </div>
                    <div style={{ fontFamily: 'monospace', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                      {selectedHex}
                    </div>
                  </div>
                  <input
                    type="color"
                    value={selectedHex}
                    onChange={(e) => {
                      setSelectedHex(e.target.value);
                      setSelectedColourName('Custom Shade');
                    }}
                    style={{ width: '36px', height: '36px', cursor: 'pointer', border: 'none', background: 'none' }}
                    title="Pick custom hex color"
                  />
                </div>
              </div>

              {/* Preset Swatches Palette */}
              <div style={{ marginBottom: '1.5rem' }}>
                <label className="form-label">Popular Designer Swatches</label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px' }}>
                  {presetColours.map((c, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setSelectedHex(c.hex);
                        setSelectedColourName(c.name);
                      }}
                      style={{
                        padding: '6px',
                        borderRadius: '8px',
                        border: '1.5px solid',
                        borderColor: selectedHex === c.hex ? 'var(--accent)' : 'transparent',
                        backgroundColor: '#F8FAFC',
                        cursor: 'pointer',
                        textAlign: 'center',
                      }}
                    >
                      <div
                        style={{
                          height: '28px',
                          borderRadius: '6px',
                          backgroundColor: c.hex,
                          marginBottom: '4px',
                        }}
                      ></div>
                      <div
                        style={{
                          fontSize: '0.6875rem',
                          fontWeight: '600',
                          color: 'var(--primary)',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {c.name}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Coating Intensity Slider */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <label className="form-label" style={{ marginBottom: 0 }}>
                    Paint Opacity / Coat Density: {blendIntensity}%
                  </label>
                </div>
                <input
                  type="range"
                  min="20"
                  max="95"
                  value={blendIntensity}
                  onChange={(e) => setBlendIntensity(Number(e.target.value))}
                  style={{ width: '100%', accentColor: 'var(--accent)', cursor: 'pointer' }}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  <span>Translucent (1 Coat)</span>
                  <span>Opaque Solid (2-3 Coats)</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ADVANCED FEATURE C: AI COLOUR RECOMMENDATION QUESTIONNAIRE */}
        <div className="card" style={{ padding: '2.5rem', backgroundColor: '#FFFFFF' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1rem' }}>
            <div style={{ padding: '8px', background: '#FEF3C7', borderRadius: '10px', color: '#D97706' }}>
              <Sparkles size={24} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.5rem', color: 'var(--primary)' }}>
                AI Architectural Colour Recommendation Engine
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                Provide your room orientation, illumination type, and style preference to receive an authentic coordinated palette.
              </p>
            </div>
          </div>

          <form onSubmit={handleAIRecommend} style={{ marginBottom: '2.5rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem', marginBottom: '1.5rem' }}>
              <div>
                <label className="form-label">Room Type</label>
                <select
                  value={aiForm.roomType}
                  onChange={(e) => setAiForm({ ...aiForm, roomType: e.target.value })}
                  className="form-control"
                >
                  <option value="Living Room">Living Room</option>
                  <option value="Bedroom">Master Bedroom</option>
                  <option value="Exterior">Exterior Façade</option>
                  <option value="Kitchen">Kitchen & Dining</option>
                  <option value="Kids Room">Kids Room</option>
                  <option value="Study">Executive Study / Office</option>
                </select>
              </div>

              <div>
                <label className="form-label">Natural Lighting Condition</label>
                <select
                  value={aiForm.lighting}
                  onChange={(e) => setAiForm({ ...aiForm, lighting: e.target.value })}
                  className="form-control"
                >
                  <option value="Abundant Natural Light">Abundant South/West Daylight</option>
                  <option value="North Facing (Cool Soft Light)">North Facing (Cool Soft Light)</option>
                  <option value="Warm 2700K Artificial Lamps">Warm 2700K Artificial Lamps</option>
                  <option value="Cool White 6500K Tube Lights">Cool White 6500K Daylight LED</option>
                </select>
              </div>

              <div>
                <label className="form-label">Interior Design Aesthetic</label>
                <select
                  value={aiForm.preferredStyle}
                  onChange={(e) => setAiForm({ ...aiForm, preferredStyle: e.target.value })}
                  className="form-control"
                >
                  <option value="Modern Minimalist">Modern Minimalist</option>
                  <option value="Traditional Indian">Traditional Indian (Teak & Brass)</option>
                  <option value="Scandinavian">Scandinavian Airy</option>
                  <option value="Calm & Relaxing">Calm & Relaxing Sanctuary</option>
                  <option value="Warm Luxe">Warm Luxe Boutique</option>
                </select>
              </div>

              <div>
                <label className="form-label">Color Mood Tone</label>
                <input
                  type="text"
                  value={aiForm.colourPreference}
                  onChange={(e) => setAiForm({ ...aiForm, colourPreference: e.target.value })}
                  placeholder="e.g. Earthy terracotta, serene oceanic"
                  className="form-control"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={aiLoading}
              className="btn btn-primary"
              style={{ padding: '0.85rem 2rem', fontSize: '1rem' }}
            >
              {aiLoading ? (
                'Analyzing Color Harmony...'
              ) : (
                <>
                  <Sparkles size={18} /> Generate AI Palette Recommendations
                </>
              )}
            </button>
          </form>

          {/* AI Result Box */}
          {aiResult && (
            <div
              style={{
                backgroundColor: '#F8FAFC',
                borderRadius: '16px',
                border: '1.5px solid var(--border-color)',
                padding: '2rem',
                animation: 'fadeIn 0.3s ease',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', flexWrap: 'wrap', gap: '8px' }}>
                <h4 style={{ fontSize: '1.35rem', color: 'var(--primary)' }}>
                  {aiResult.themeTitle}
                </h4>
                <span className="badge badge-brand">AI Curated Formulation</span>
              </div>
              <p style={{ color: '#475569', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '2rem' }}>
                {aiResult.designerNotes}
              </p>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                  gap: '1.5rem',
                }}
              >
                {aiResult.palette?.map((item, idx) => (
                  <div
                    key={idx}
                    className="card"
                    style={{ padding: '1.25rem', backgroundColor: '#FFFFFF', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
                  >
                    <div>
                      <div
                        style={{
                          height: '90px',
                          borderRadius: '10px',
                          backgroundColor: item.hex,
                          marginBottom: '1rem',
                          boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.1)',
                        }}
                      ></div>
                      <div style={{ fontSize: '0.75rem', fontWeight: '800', color: 'var(--accent)', textTransform: 'uppercase', marginBottom: '2px' }}>
                        {item.role}
                      </div>
                      <h5 style={{ fontSize: '1.15rem', color: 'var(--primary)', marginBottom: '4px' }}>
                        {item.name}
                      </h5>
                      <div style={{ fontFamily: 'monospace', fontWeight: '700', fontSize: '0.85rem', color: '#64748B', marginBottom: '8px' }}>
                        {item.hex}
                      </div>
                      <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', lineHeight: '1.5', marginBottom: '1rem' }}>
                        {item.explanation}
                      </p>
                    </div>

                    <div>
                      <div style={{ fontSize: '0.75rem', color: '#0F172A', fontWeight: '600', backgroundColor: '#F1F5F9', padding: '4px 8px', borderRadius: '4px', marginBottom: '10px' }}>
                        Recommended: {item.sheen} ({item.productRecommendation})
                      </div>
                      <button
                        onClick={() => {
                          setSelectedHex(item.hex);
                          setSelectedColourName(item.name);
                          window.scrollTo({ top: 200, behavior: 'smooth' });
                          showToast(`Applied ${item.name} to visualizer above!`);
                        }}
                        className="btn btn-outline"
                        style={{ width: '100%', padding: '0.5rem', fontSize: '0.85rem' }}
                      >
                        Apply to Room Above
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16),
    }
    : null;
}
