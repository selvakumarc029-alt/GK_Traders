import React, { createContext, useContext, useState, useEffect } from 'react';
import { getStoreInfo } from '../services/api';

const ShopContext = createContext();

export const ShopProvider = ({ children }) => {
  const [storeInfo, setStoreInfo] = useState({
    name: 'G.K Traders Paints',
    slogan: 'YOUR TRUST. OUR PRIDE.',
    tagline: 'Colouring your world with trust',
    phone: '+91 70104 99526',
    altPhone: '+91 91235 01787',
    allPhones: ['7010499526', '9123501787'],
    whatsapp: '917010499526',
    email: 'info@gktraderspaints.com',
    address: '15/5C Rajiv Gandhi Nagar, Sivakasi Main Road, Opp to Cotton Research Centre, Srivilliputhur – 626125',
    landmark: 'Opp to Cotton Research Centre',
    city: 'Srivilliputhur',
    pincode: '626125',
    timings: 'Mon - Sat: 8:30 AM – 9:00 PM | Sun: 9:00 AM – 2:00 PM',
    authorizedBrands: ['Asian Paints', 'Berger Paints', 'Nerolac', 'Indigo Paints', 'Birla White', 'Dr. Fixit'],
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Cotton+Research+Centre+Sivakasi+Main+Road+Srivilliputhur+626125',
  });

  const [savedColours, setSavedColours] = useState(() => {
    try {
      const saved = localStorage.getItem('gk_saved_colours');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [toast, setToast] = useState(null);

  useEffect(() => {
    getStoreInfo()
      .then((res) => {
        if (res.success && res.data) {
          setStoreInfo(res.data);
        }
      })
      .catch((err) => {
        console.warn('Using default store info fallback:', err.message);
      });
  }, []);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  const toggleSaveColour = (colour) => {
    let updated;
    const exists = savedColours.some((c) => c.code === colour.code);
    if (exists) {
      updated = savedColours.filter((c) => c.code !== colour.code);
      showToast(`Removed "${colour.name}" from your palette`, 'info');
    } else {
      updated = [...savedColours, colour];
      showToast(`Saved "${colour.name}" to your palette!`);
    }
    setSavedColours(updated);
    try {
      localStorage.setItem('gk_saved_colours', JSON.stringify(updated));
    } catch (e) {
      console.warn(e);
    }
  };

  const openWhatsApp = (customMessage = '') => {
    const defaultMsg = `Hello G.K Traders Paints, I would like to inquire about paints & consultation for my home.`;
    const msg = encodeURIComponent(customMessage || defaultMsg);
    const url = `https://wa.me/${storeInfo.whatsapp || '919845012345'}?text=${msg}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <ShopContext.Provider
      value={{
        storeInfo,
        savedColours,
        toggleSaveColour,
        openWhatsApp,
        toast,
        showToast,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
