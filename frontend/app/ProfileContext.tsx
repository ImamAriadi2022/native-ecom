import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  joinDate: string;
  dateOfBirth: string;
  gender: 'male' | 'female' | 'other';
  totalOrders: number;
  points: number;
}

export interface Address {
  id: string;
  label: string;
  name: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  isDefault: boolean;
  latitude?: number;
  longitude?: number;
}

export interface PaymentMethod {
  id: string;
  type: 'bank_transfer' | 'gopay' | 'ovo' | 'dana' | 'shopeepay';
  name: string;
  accountNumber?: string;
  holderName?: string;
  maskedNumber?: string;
  isDefault: boolean;
}

export interface OrderHistory {
  id: string;
  orderId: string;
  date: string;
  items: Array<{
    id: number;
    name: string;
    image: string;
    price: number;
    quantity: number;
  }>;
  total: number;
  status: 'pending' | 'paid' | 'shipped' | 'delivered' | 'cancelled';
  paymentMethod: string;
  shippingAddress: Address;
  trackingNumber?: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'order' | 'shipping' | 'payment' | 'promo';
  date: string;
  createdAt?: string;
  isRead: boolean;
  orderId?: string;
  orderStatus?: 'processing' | 'shipped' | 'delivered';
}

interface ProfileContextType {
  // Profile
  userProfile: UserProfile | null;
  updateProfile: (profile: Partial<UserProfile>) => Promise<void>;
  
  // Addresses
  addresses: Address[];
  addAddress: (address: Omit<Address, 'id'>) => Promise<void>;
  updateAddress: (id: string, address: Partial<Address>) => Promise<void>;
  deleteAddress: (id: string) => Promise<void>;
  setDefaultAddress: (id: string) => Promise<void>;
  
  // Payment Methods
  paymentMethods: PaymentMethod[];
  addPaymentMethod: (method: Omit<PaymentMethod, 'id'>) => Promise<void>;
  updatePaymentMethod: (id: string, method: Partial<PaymentMethod>) => Promise<void>;
  deletePaymentMethod: (id: string) => Promise<void>;
  setDefaultPaymentMethod: (id: string) => Promise<void>;
  
  // Order History
  orderHistory: OrderHistory[];
  addOrderHistory: (order: Omit<OrderHistory, 'id'>) => Promise<void>;
  updateOrderStatus: (orderId: string, status: OrderHistory['status'], trackingNumber?: string) => Promise<void>;
  clearOrderHistory: () => Promise<void>;
  restartSimulation: () => Promise<void>;
  
  // Notifications
  notifications: Notification[];
  addNotification: (notification: Omit<Notification, 'id'>) => Promise<void>;
  markNotificationAsRead: (id: string) => Promise<void>;
  markAllNotificationsAsRead: () => Promise<void>;
  clearAllNotifications: () => Promise<void>;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

// Storage keys
const PROFILE_STORAGE_KEY = '@lyana_bottle_profile';
const ADDRESSES_STORAGE_KEY = '@lyana_bottle_addresses';
const PAYMENT_METHODS_STORAGE_KEY = '@lyana_bottle_payment_methods';
const ORDER_HISTORY_STORAGE_KEY = '@lyana_bottle_order_history';
const NOTIFICATIONS_STORAGE_KEY = '@lyana_bottle_notifications';

export const ProfileProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [orderHistory, setOrderHistory] = useState<OrderHistory[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  // Load data on mount
  useEffect(() => {
    loadAllData();
    initializeDefaultData();
  }, []);

  const loadAllData = async () => {
    try {
      const [profileData, addressData, paymentData, historyData, notificationData] = await Promise.all([
        AsyncStorage.getItem(PROFILE_STORAGE_KEY),
        AsyncStorage.getItem(ADDRESSES_STORAGE_KEY),
        AsyncStorage.getItem(PAYMENT_METHODS_STORAGE_KEY),
        AsyncStorage.getItem(ORDER_HISTORY_STORAGE_KEY),
        AsyncStorage.getItem(NOTIFICATIONS_STORAGE_KEY),
      ]);

      if (profileData) setUserProfile(JSON.parse(profileData));
      if (addressData) setAddresses(JSON.parse(addressData));
      if (paymentData) setPaymentMethods(JSON.parse(paymentData));
      if (historyData) setOrderHistory(JSON.parse(historyData));
      if (notificationData) setNotifications(JSON.parse(notificationData));
    } catch (error) {
      console.error('Error loading profile data:', error);
    }
  };

  const initializeDefaultData = async () => {
    // Initialize default profile if not exists
    const profileData = await AsyncStorage.getItem(PROFILE_STORAGE_KEY);
    if (!profileData) {
      const defaultProfile: UserProfile = {
        id: 'user-001',
        name: 'Juliana Permata Devi',
        email: 'devi@gmail.com',
        phone: '+62 812-3456-7890',
        avatar: 'meong.png',
        joinDate: 'November 2024',
        dateOfBirth: '1995-06-15',
        gender: 'female',
        totalOrders: 0,
        points: 2450,
      };
      await updateProfile(defaultProfile);
    }
  };

  // Profile functions
  const updateProfile = async (profile: Partial<UserProfile>) => {
    try {
      const updatedProfile = userProfile ? { ...userProfile, ...profile } : profile as UserProfile;
      setUserProfile(updatedProfile);
      await AsyncStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(updatedProfile));
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  // Address functions
  const addAddress = async (address: Omit<Address, 'id'>) => {
    try {
      const newAddress: Address = {
        ...address,
        id: 'addr-' + Date.now(),
      };
      
      let updatedAddresses = [...addresses, newAddress];
      
      // Set as default if it's the first address
      if (updatedAddresses.length === 1) {
        updatedAddresses[0].isDefault = true;
      }
      
      setAddresses(updatedAddresses);
      await AsyncStorage.setItem(ADDRESSES_STORAGE_KEY, JSON.stringify(updatedAddresses));
    } catch (error) {
      console.error('Error adding address:', error);
    }
  };

  const updateAddress = async (id: string, addressUpdate: Partial<Address>) => {
    try {
      const updatedAddresses = addresses.map(addr => 
        addr.id === id ? { ...addr, ...addressUpdate } : addr
      );
      setAddresses(updatedAddresses);
      await AsyncStorage.setItem(ADDRESSES_STORAGE_KEY, JSON.stringify(updatedAddresses));
    } catch (error) {
      console.error('Error updating address:', error);
    }
  };

  const deleteAddress = async (id: string) => {
    try {
      const updatedAddresses = addresses.filter(addr => addr.id !== id);
      setAddresses(updatedAddresses);
      await AsyncStorage.setItem(ADDRESSES_STORAGE_KEY, JSON.stringify(updatedAddresses));
    } catch (error) {
      console.error('Error deleting address:', error);
    }
  };

  const setDefaultAddress = async (id: string) => {
    try {
      const updatedAddresses = addresses.map(addr => ({
        ...addr,
        isDefault: addr.id === id
      }));
      setAddresses(updatedAddresses);
      await AsyncStorage.setItem(ADDRESSES_STORAGE_KEY, JSON.stringify(updatedAddresses));
    } catch (error) {
      console.error('Error setting default address:', error);
    }
  };

  // Payment method functions
  const addPaymentMethod = async (method: Omit<PaymentMethod, 'id'>) => {
    try {
      const newMethod: PaymentMethod = {
        ...method,
        id: 'pm-' + Date.now(),
      };
      
      let updatedMethods = [...paymentMethods, newMethod];
      
      // Set as default if it's the first method
      if (updatedMethods.length === 1) {
        updatedMethods[0].isDefault = true;
      }
      
      setPaymentMethods(updatedMethods);
      await AsyncStorage.setItem(PAYMENT_METHODS_STORAGE_KEY, JSON.stringify(updatedMethods));
    } catch (error) {
      console.error('Error adding payment method:', error);
    }
  };

  const updatePaymentMethod = async (id: string, methodUpdate: Partial<PaymentMethod>) => {
    try {
      const updatedMethods = paymentMethods.map(method => 
        method.id === id ? { ...method, ...methodUpdate } : method
      );
      setPaymentMethods(updatedMethods);
      await AsyncStorage.setItem(PAYMENT_METHODS_STORAGE_KEY, JSON.stringify(updatedMethods));
    } catch (error) {
      console.error('Error updating payment method:', error);
    }
  };

  const deletePaymentMethod = async (id: string) => {
    try {
      const updatedMethods = paymentMethods.filter(method => method.id !== id);
      setPaymentMethods(updatedMethods);
      await AsyncStorage.setItem(PAYMENT_METHODS_STORAGE_KEY, JSON.stringify(updatedMethods));
    } catch (error) {
      console.error('Error deleting payment method:', error);
    }
  };

  const setDefaultPaymentMethod = async (id: string) => {
    try {
      const updatedMethods = paymentMethods.map(method => ({
        ...method,
        isDefault: method.id === id
      }));
      setPaymentMethods(updatedMethods);
      await AsyncStorage.setItem(PAYMENT_METHODS_STORAGE_KEY, JSON.stringify(updatedMethods));
    } catch (error) {
      console.error('Error setting default payment method:', error);
    }
  };

  // Order history functions
  const addOrderHistory = async (order: Omit<OrderHistory, 'id'>) => {
    try {
      // Check if order already exists to prevent duplicates
      const existingOrder = orderHistory.find(existingOrder => existingOrder.orderId === order.orderId);
      if (existingOrder) {
        console.log('Order already exists:', order.orderId);
        return; // Don't add duplicate
      }

      const newOrder: OrderHistory = {
        ...order,
        id: 'order-' + Date.now(),
      };
      
      const updatedHistory = [newOrder, ...orderHistory];
      setOrderHistory(updatedHistory);
      await AsyncStorage.setItem(ORDER_HISTORY_STORAGE_KEY, JSON.stringify(updatedHistory));
      
      // Update total orders in profile
      if (userProfile) {
        await updateProfile({ totalOrders: userProfile.totalOrders + 1 });
      }
    } catch (error) {
      console.error('Error adding order history:', error);
    }
  };

  const updateOrderStatus = async (orderId: string, status: OrderHistory['status'], trackingNumber?: string) => {
    try {
      const updatedHistory = orderHistory.map(order => 
        order.orderId === orderId ? { 
          ...order, 
          status, 
          ...(trackingNumber && { trackingNumber }) 
        } : order
      );
      setOrderHistory(updatedHistory);
      await AsyncStorage.setItem(ORDER_HISTORY_STORAGE_KEY, JSON.stringify(updatedHistory));
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  const clearOrderHistory = async () => {
    try {
      setOrderHistory([]);
      await AsyncStorage.removeItem(ORDER_HISTORY_STORAGE_KEY);
    } catch (error) {
      console.error('Error clearing order history:', error);
    }
  };

  const restartSimulation = async () => {
    try {
      // Reset semua pesanan ke status 'paid' dan update timestamp ke sekarang
      const updatedHistory = orderHistory.map(order => ({
        ...order,
        status: 'paid' as const,
        date: new Date().toISOString(), // Gunakan ISO format untuk akurasi
        trackingNumber: undefined, // Remove tracking number
      }));
      
      setOrderHistory(updatedHistory);
      await AsyncStorage.setItem(ORDER_HISTORY_STORAGE_KEY, JSON.stringify(updatedHistory));
    } catch (error) {
      console.error('Error restarting simulation:', error);
    }
  };

  // Notification functions
  const addNotification = async (notification: Omit<Notification, 'id'>) => {
    try {
      const newNotification: Notification = {
        ...notification,
        id: 'notif-' + Date.now(),
      };
      
      const updatedNotifications = [newNotification, ...notifications];
      setNotifications(updatedNotifications);
      await AsyncStorage.setItem(NOTIFICATIONS_STORAGE_KEY, JSON.stringify(updatedNotifications));
    } catch (error) {
      console.error('Error adding notification:', error);
    }
  };

  const markNotificationAsRead = async (id: string) => {
    try {
      const updatedNotifications = notifications.map(notif => 
        notif.id === id ? { ...notif, isRead: true } : notif
      );
      setNotifications(updatedNotifications);
      await AsyncStorage.setItem(NOTIFICATIONS_STORAGE_KEY, JSON.stringify(updatedNotifications));
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  const markAllNotificationsAsRead = async () => {
    try {
      const updatedNotifications = notifications.map(notif => ({ ...notif, isRead: true }));
      setNotifications(updatedNotifications);
      await AsyncStorage.setItem(NOTIFICATIONS_STORAGE_KEY, JSON.stringify(updatedNotifications));
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
    }
  };

  const clearAllNotifications = async () => {
    try {
      setNotifications([]);
      await AsyncStorage.removeItem(NOTIFICATIONS_STORAGE_KEY);
    } catch (error) {
      console.error('Error clearing notifications:', error);
    }
  };

  const contextValue: ProfileContextType = {
    // Profile
    userProfile,
    updateProfile,
    
    // Addresses
    addresses,
    addAddress,
    updateAddress,
    deleteAddress,
    setDefaultAddress,
    
    // Payment Methods
    paymentMethods,
    addPaymentMethod,
    updatePaymentMethod,
    deletePaymentMethod,
    setDefaultPaymentMethod,
    
    // Order History
    orderHistory,
    addOrderHistory,
    updateOrderStatus,
    clearOrderHistory,
    restartSimulation,
    
    // Notifications
    notifications,
    addNotification,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    clearAllNotifications,
  };

  return (
    <ProfileContext.Provider value={contextValue}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = (): ProfileContextType => {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return context;
};