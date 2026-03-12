// Firestore Service - Channel text, watch history সব এখানে save হবে
import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  limit,
  serverTimestamp,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  increment,
} from 'firebase/firestore';
import { db } from './firebase';

// ========================
// TYPES
// ========================
export interface WatchRecord {
  userId: number;
  userName: string;
  contentTitle: string;
  contentCategory: string;
  contentType: string;
  watchedAt?: any;
}

export interface ChannelMessage {
  userId: number;
  userName: string;
  message: string;
  sentAt?: any;
}

export interface UserProfile {
  userId: number;
  firstName: string;
  lastName?: string;
  username?: string;
  photoUrl?: string;
  totalWatched: number;
  lastSeen?: any;
  joinedAt?: any;
}

// ========================
// WATCH HISTORY
// ========================

// User যখন কোনো content দেখে, সেটা save করো
export async function saveWatchHistory(record: WatchRecord) {
  try {
    await addDoc(collection(db, 'watchHistory'), {
      ...record,
      watchedAt: serverTimestamp(),
    });
    console.log('✅ Watch history saved');
  } catch (error) {
    console.error('❌ Error saving watch history:', error);
  }
}

// সব watch history দেখো (Admin panel এর জন্য)
export async function getWatchHistory(limitCount = 50) {
  try {
    const q = query(
      collection(db, 'watchHistory'),
      orderBy('watchedAt', 'desc'),
      limit(limitCount)
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('❌ Error fetching watch history:', error);
    return [];
  }
}

// ========================
// CHANNEL MESSAGES (Telegram Channel Text Save)
// ========================

// Channel এর message/text save করো
export async function saveChannelMessage(msg: ChannelMessage) {
  try {
    await addDoc(collection(db, 'channelMessages'), {
      ...msg,
      sentAt: serverTimestamp(),
    });
    console.log('✅ Channel message saved');
  } catch (error) {
    console.error('❌ Error saving channel message:', error);
  }
}

// সব channel messages দেখো
export async function getChannelMessages(limitCount = 100) {
  try {
    const q = query(
      collection(db, 'channelMessages'),
      orderBy('sentAt', 'desc'),
      limit(limitCount)
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('❌ Error fetching channel messages:', error);
    return [];
  }
}

// ========================
// USER PROFILES
// ========================

// User profile save/update করো
export async function saveOrUpdateUser(user: UserProfile) {
  try {
    const userRef = doc(db, 'users', String(user.userId));
    const existing = await getDoc(userRef);

    if (existing.exists()) {
      // আগে থেকে আছে, শুধু lastSeen update করো
      await updateDoc(userRef, {
        lastSeen: serverTimestamp(),
        firstName: user.firstName,
        lastName: user.lastName || '',
        photoUrl: user.photoUrl || '',
      });
    } else {
      // নতুন user
      await setDoc(userRef, {
        ...user,
        totalWatched: 0,
        joinedAt: serverTimestamp(),
        lastSeen: serverTimestamp(),
      });
    }
    console.log('✅ User saved/updated');
  } catch (error) {
    console.error('❌ Error saving user:', error);
  }
}

// User এর watch count বাড়াও
export async function incrementUserWatchCount(userId: number) {
  try {
    const userRef = doc(db, 'users', String(userId));
    await updateDoc(userRef, {
      totalWatched: increment(1),
      lastSeen: serverTimestamp(),
    });
  } catch (error) {
    console.error('❌ Error incrementing watch count:', error);
  }
}

// সব users দেখো (Admin)
export async function getAllUsers() {
  try {
    const snapshot = await getDocs(collection(db, 'users'));
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('❌ Error fetching users:', error);
    return [];
  }
}
