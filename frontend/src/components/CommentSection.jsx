// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import { toast } from 'react-toastify';

// function CommentForm({ parentType, parentId, parentComment, onComment, userToken }) {
//   const [content, setContent] = useState('');
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!content.trim()) return;
//     setLoading(true);
//     try {
//       await axios.post('/api/comments', {
//         content,
//         parentType,
//         parentId,
//         parentComment
//       }, {
//         headers: { Authorization: `Bearer ${userToken}` }
//       });
//       toast.success('Comment posted!');
//       setContent('');
//       onComment();
//     } catch (err) {
//       toast.error(err.response?.data?.error || 'Failed to post comment');
//     }
//     setLoading(false);
//   };

//   return (
//     <form onSubmit={handleSubmit} className="flex flex-col gap-2 mb-4">
//       <textarea
//         className="border p-2 rounded"
//         placeholder="Add a comment..."
//         value={content}
//         onChange={e => setContent(e.target.value)}
//         required
//       />
//       <button
//         type="submit"
//         className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
//         disabled={loading}
//       >
//         {loading ? 'Posting...' : parentComment ? 'Reply' : 'Comment'}
//       </button>
//     </form>
//   );
// }

// function Comment({ comment, parentType, parentId, onComment, userToken, userLoggedIn }) {
//   const [showReply, setShowReply] = useState(false);
//   const [likeCount, setLikeCount] = useState(comment.likes.length);
//   const [liked, setLiked] = useState(false);

//   useEffect(() => {
//     if (!userToken) return setLiked(false);
//     try {
//       const payload = JSON.parse(atob(userToken.split('.')[1]));
//       setLiked(comment.likes.includes(payload.id));
//     } catch {
//       setLiked(false);
//     }
//   }, [userToken, comment.likes]);

//   const handleLike = async () => {
//     if (!userToken) return;
//     try {
//       const res = await axios.post(`/api/comments/${comment._id}/like`, {}, {
//         headers: { Authorization: `Bearer ${userToken}` }
//       });
//       setLikeCount(res.data.likes);
//       setLiked(!liked);
//       toast.success(liked ? 'Unliked comment' : 'Liked comment');
//       onComment();
//     } catch (err) {
//       toast.error(err.response?.data?.error || 'Failed to like comment');
//     }
//   };

//   return (
//     <div className="mb-4 border-l-2 pl-4">
//       <div className="flex items-center gap-2">
//         <span className="font-semibold text-blue-700">{comment.author}</span>
//         <span className="text-xs text-gray-400">{new Date(comment.createdAt).toLocaleString()}</span>
//       </div>
//       <div className="mb-2 text-gray-800">{comment.content}</div>
//       <div className="flex items-center gap-4 mb-2">
//         <button
//           className={`text-sm ${liked ? 'text-blue-600' : 'text-gray-500'} hover:underline`}
//           onClick={handleLike}
//           disabled={!userLoggedIn}
//         >
//           {liked ? 'Unlike' : 'Like'} ({likeCount})
//         </button>
//         {userLoggedIn && (
//           <button
//             className="text-sm text-gray-500 hover:underline"
//             onClick={() => setShowReply(!showReply)}
//           >
//             {showReply ? 'Cancel' : 'Reply'}
//           </button>
//         )}
//       </div>
//       {showReply && userLoggedIn && (
//         <CommentForm
//           parentType={parentType}
//           parentId={parentId}
//           parentComment={comment._id}
//           onComment={onComment}
//           userToken={userToken}
//         />
//       )}
//       {/* Render replies recursively */}
//       {comment.replies && comment.replies.length > 0 && (
//         <div className="ml-4 border-l pl-4">
//           {comment.replies.map(reply => (
//             <Comment
//               key={reply._id}
//               comment={reply}
//               parentType={parentType}
//               parentId={parentId}
//               onComment={onComment}
//               userToken={userToken}
//               userLoggedIn={userLoggedIn}
//             />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// export default function CommentSection({ parentType, parentId }) {
//   const [comments, setComments] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const userToken = localStorage.getItem('userToken');
//   const userLoggedIn = !!userToken;

//   const fetchComments = () => {
//     setLoading(true);
//     axios.get(`/api/comments?parentType=${parentType}&parentId=${parentId}`)
//       .then(res => {
//         setComments(res.data);
//         setLoading(false);
//       });
//   };

//   useEffect(() => {
//     fetchComments();
//     // eslint-disable-next-line
//   }, [parentType, parentId]);

//   return (
//     <div className="bg-gray-50 p-4 rounded shadow">
//       <h3 className="text-lg font-semibold mb-2">Add a Comment</h3>
//       {userLoggedIn ? (
//         <CommentForm parentType={parentType} parentId={parentId} onComment={fetchComments} userToken={userToken} />
//       ) : (
//         <div className="mb-4 p-3 bg-yellow-100 text-yellow-800 rounded text-center font-semibold">
//           Please <span className="underline">log in</span> or <span className="underline">sign up</span> to comment or like.
//         </div>
//       )}
//       {loading ? (
//         <div className="text-gray-500">Loading comments...</div>
//       ) : (
//         <div>
//           {comments.length === 0 ? (
//             <div className="text-gray-400">No comments yet.</div>
//           ) : (
//             comments.map(comment => (
//               <Comment
//                 key={comment._id}
//                 comment={comment}
//                 parentType={parentType}
//                 parentId={parentId}
//                 onComment={fetchComments}
//                 userToken={userToken}
//                 userLoggedIn={userLoggedIn}
//               />
//             ))
//           )}
//         </div>
//       )}
//     </div>
//   );
// } 



// import { useEffect, useState, useCallback } from 'react';

// // Authentication hook
// const useAuth = () => {
//   const [user, setUser] = useState(null);
//   const [token, setToken] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     try {
//       const storedToken = localStorage.getItem('userToken');
//       const storedUser = localStorage.getItem('user');
      
//       if (storedToken) {
//         setToken(storedToken);
//         try {
//           const payload = JSON.parse(atob(storedToken.split('.')[1]));
//           setUser(storedUser ? JSON.parse(storedUser) : { 
//             id: payload.id || payload.userId, 
//             username: payload.username || payload.name || 'User',
//             email: payload.email 
//           });
//         } catch (decodeError) {
//           console.warn('Token decode failed:', decodeError);
//           if (storedUser) {
//             setUser(JSON.parse(storedUser));
//           }
//         }
//       }
//     } catch (error) {
//       console.warn('Auth initialization failed:', error);
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   const login = (userData, authToken) => {
//     setUser(userData);
//     setToken(authToken);
//     localStorage.setItem('user', JSON.stringify(userData));
//     localStorage.setItem('userToken', authToken);
//   };

//   const logout = () => {
//     setUser(null);
//     setToken(null);
//     localStorage.removeItem('user');
//     localStorage.removeItem('userToken');
//   };

//   return { 
//     user, 
//     token, 
//     login, 
//     logout, 
//     isAuthenticated: !!token && !!user,
//     loading 
//   };
// };

// function CommentForm({ parentType, parentId, parentComment, onComment, userToken, onCancel = null }) {
//   const [content, setContent] = useState('');
//   const [loading, setLoading] = useState(false);

//   const showToast = useCallback((message, type = 'success') => {
//     const existingToasts = document.querySelectorAll('.toast-notification');
//     existingToasts.forEach(toast => toast.remove());

//     const toast = document.createElement('div');
//     toast.className = `toast-notification fixed top-4 right-4 z-50 px-6 py-3 rounded-lg text-white font-medium transform transition-all duration-300 ${
//       type === 'success' ? 'bg-green-500' : 'bg-red-500'
//     }`;
//     toast.textContent = message;
//     document.body.appendChild(toast);
    
//     setTimeout(() => {
//       if (document.body.contains(toast)) {
//         toast.style.transform = 'translateX(400px)';
//         setTimeout(() => {
//           if (document.body.contains(toast)) {
//             document.body.removeChild(toast);
//           }
//         }, 300);
//       }
//     }, 3000);
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     if (!content.trim()) {
//       showToast('Please enter a comment', 'error');
//       return;
//     }
    
//     if (!userToken) {
//       showToast('Please log in to comment', 'error');
//       return;
//     }

//     setLoading(true);
    
//     try {
//       const response = await fetch('/api/comments', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${userToken}`
//         },
//         body: JSON.stringify({
//           content: content.trim(),
//           parentType,
//           parentId,
//           parentComment
//         })
//       });
      
//       if (!response.ok) {
//         const errorData = await response.json().catch(() => ({}));
//         throw new Error(errorData.error || errorData.message || `HTTP ${response.status}: ${response.statusText}`);
//       }
      
//       const responseData = await response.json();
//       showToast(parentComment ? 'Reply posted successfully!' : 'Comment posted successfully!');
//       setContent('');
      
//       if (onComment) {
//         onComment(responseData);
//       }
      
//       if (onCancel) {
//         onCancel();
//       }
//     } catch (err) {
//       console.error('Comment submission error:', err);
//       showToast(err.message || 'Failed to post comment', 'error');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="flex flex-col gap-4 mb-6">
//       <div className="relative">
//         <textarea
//           className="w-full px-4 py-3 bg-white/5 backdrop-blur-md border border-white/20 rounded-2xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none min-h-[100px]"
//           placeholder={parentComment ? "Share your thoughts on this comment..." : "Share your thoughts about the cosmos..."}
//           value={content}
//           onChange={(e) => setContent(e.target.value)}
//           maxLength={1000}
//           disabled={loading}
//           required
//           aria-label="Comment input"
//         />
//         <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl blur opacity-0 focus-within:opacity-20 transition-opacity duration-300 -z-10"></div>
//         <div className="absolute bottom-3 right-3 text-xs text-white/40">
//           {content.length}/1000
//         </div>
//       </div>
      
//       <div className="flex gap-3 self-end">
//         {onCancel && (
//           <button
//             type="button"
//             className="px-4 py-2 text-white/70 hover:text-white border border-white/20 hover:border-white/40 rounded-xl transition-all duration-300 disabled:opacity-50"
//             onClick={onCancel}
//             disabled={loading}
//             aria-label="Cancel reply"
//           >
//             Cancel
//           </button>
//         )}
//         <button
//           type="submit"
//           className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
//           disabled={loading || !content.trim()}
//           aria-label={parentComment ? "Submit reply" : "Submit comment"}
//         >
//           {loading ? (
//             <div className="flex items-center gap-2">
//               <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//               Posting...
//             </div>
//           ) : (
//             <div className="flex items-center gap-2">
//               {parentComment ? (
//                 <>
//                   <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
//                   </svg>
//                   Reply
//                 </>
//               ) : (
//                 <>
//                   <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
//                   </svg>
//                   Comment
//                 </>
//               )}
//             </div>
//           )}
//         </button>
//       </div>
//     </form>
//   );
// }

// function Comment({ comment, parentType, parentId, onComment, userToken, isAuthenticated, currentUserId, depth = 0 }) {
//   const [showReply, setShowReply] = useState(false);
//   const [likeCount, setLikeCount] = useState(comment.likes?.length || 0);
//   const [liked, setLiked] = useState(false);
//   const [likingInProgress, setLikingInProgress] = useState(false);

//   const showToast = useCallback((message, type = 'success') => {
//     const existingToasts = document.querySelectorAll('.toast-notification');
//     existingToasts.forEach(toast => toast.remove());

//     const toast = document.createElement('div');
//     toast.className = `toast-notification fixed top-4 right-4 z-50 px-6 py-3 rounded-lg text-white font-medium transform transition-all duration-300 ${
//       type === 'success' ? 'bg-green-500' : 'bg-red-500'
//     }`;
//     toast.textContent = message;
//     document.body.appendChild(toast);
    
//     setTimeout(() => {
//       if (document.body.contains(toast)) {
//         toast.style.transform = 'translateX(400px)';
//         setTimeout(() => {
//           if (document.body.contains(toast)) {
//             document.body.removeChild(toast);
//           }
//         }, 300);
//       }
//     }, 3000);
//   }, []);

//   useEffect(() => {
//     if (!userToken || !comment.likes) {
//       setLiked(false);
//       return;
//     }
    
//     try {
//       let userId = currentUserId;
//       if (!userId && userToken) {
//         try {
//           const payload = JSON.parse(atob(userToken.split('.')[1]));
//           userId = payload.id || payload.userId || payload.sub;
//         } catch (decodeError) {
//           console.warn('Could not decode user ID from token');
//         }
//       }
      
//       if (userId) {
//         setLiked(comment.likes.includes(userId));
//       }
//     } catch (error) {
//       console.warn('Error checking like status:', error);
//       setLiked(false);
//     }
//   }, [userToken, comment.likes, currentUserId]);

//   const handleLike = async () => {
//     if (!isAuthenticated || !userToken) {
//       showToast('Please log in to like comments', 'error');
//       return;
//     }

//     if (likingInProgress) return;

//     setLikingInProgress(true);

//     try {
//       const response = await fetch(`/api/comments/${comment._id}/like`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${userToken}`
//         }
//       });
      
//       if (!response.ok) {
//         const errorData = await response.json().catch(() => ({}));
//         throw new Error(errorData.error || errorData.message || `HTTP ${response.status}: ${response.statusText}`);
//       }
      
//       const data = await response.json();
//       setLikeCount(data.likes || data.likeCount || (liked ? likeCount - 1 : likeCount + 1));
//       setLiked(!liked);
//       showToast(liked ? 'Comment unliked' : 'Comment liked');
//       if (onComment) onComment();
//     } catch (err) {
//       console.error('Like error:', err);
//       showToast(err.message || 'Failed to update like', 'error');
//     } finally {
//       setLikingInProgress(false);
//     }
//   };

//   const formatDate = (dateString) => {
//     try {
//       const date = new Date(dateString);
//       const now = new Date();
//       const diffMs = now - date;
//       const diffMins = Math.floor(diffMs / (1000 * 60));
//       const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
//       const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

//       if (isNaN(date.getTime())) return 'Recently';
//       if (diffMins < 1) return 'Just now';
//       if (diffMins < 60) return `${diffMins}m ago`;
//       if (diffHours < 24) return `${diffHours}h ago`;
//       if (diffDays < 7) return `${diffDays}d ago`;
//       return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
//     } catch (error) {
//       return 'Recently';
//     }
//   };

//   const handleReplySubmit = () => {
//     setShowReply(false);
//     if (onComment) onComment();
//   };

//   return (
//     <div className={`relative ${depth > 0 ? 'ml-6 border-l border-white/10 pl-4' : ''}`}>
//       <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-4 mb-4 hover:bg-white/10 hover:border-white/20 transition-all duration-300 group">
//         <div className="flex items-center justify-between mb-3">
//           <div className="flex items-center gap-3">
//             <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full flex items-center justify-center text-white font-semibold text-sm">
//               {(comment.author || 'U').charAt(0).toUpperCase()}
//             </div>
//             <div>
//               <span className="font-semibold text-blue-300 group-hover:text-blue-200 transition-colors duration-300">
//                 {comment.author || 'Anonymous'}
//               </span>
//               <div className="flex items-center gap-2 text-xs text-white/60">
//                 <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
//                 </svg>
//                 {formatDate(comment.createdAt)}
//               </div>
//             </div>
//           </div>
//           {depth === 0 && comment._id && (
//             <div className="text-xs text-white/40 bg-white/5 px-2 py-1 rounded-full">
//               #{comment._id.slice(-6)}
//             </div>
//           )}
//         </div>
//         <div className="mb-4 text-white/90 leading-relaxed whitespace-pre-wrap">
//           {comment.content}
//         </div>
//         <div className="flex items-center gap-6">
//           <button
//             className={`flex items-center gap-2 text-sm transition-all duration-300 ${
//               liked ? 'text-red-400 hover:text-red-300' : 'text-white/60 hover:text-red-400'
//             } disabled:opacity-50 disabled:cursor-not-allowed`}
//             onClick={handleLike}
//             disabled={!isAuthenticated || likingInProgress}
//             aria-label={isAuthenticated ? (liked ? 'Unlike comment' : 'Like comment') : 'Log in to like'}
//           >
//             {likingInProgress ? (
//               <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
//             ) : (
//               <svg className={`w-4 h-4 transition-all duration-300 ${liked ? 'fill-current' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
//               </svg>
//             )}
//             <span>{likeCount}</span>
//           </button>
//           {isAuthenticated && depth < 3 && (
//             <button
//               className="flex items-center gap-2 text-sm text-white/60 hover:text-blue-400 transition-colors duration-300"
//               onClick={() => setShowReply(!showReply)}
//               aria-label={showReply ? 'Cancel reply' : 'Reply to comment'}
//             >
//               <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
//               </svg>
//               {showReply ? 'Cancel' : 'Reply'}
//             </button>
//           )}
//         </div>
//       </div>
//       {showReply && isAuthenticated && (
//         <div className="mb-4 animate-fade-in-up">
//           <CommentForm
//             parentType={parentType}
//             parentId={parentId}
//             parentComment={comment._id}
//             onComment={handleReplySubmit}
//             userToken={userToken}
//             onCancel={() => setShowReply(false)}
//           />
//         </div>
//       )}
//       {comment.replies && comment.replies.length > 0 && (
//         <div className="space-y-0">
//           {comment.replies.map(reply => (
//             <Comment
//               key={reply._id}
//               comment={reply}
//               parentType={parentType}
//               parentId={parentId}
//               onComment={onComment}
//               userToken={userToken}
//               isAuthenticated={isAuthenticated}
//               currentUserId={currentUserId}
//               depth={depth + 1}
//             />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// export default function CommentSection({ parentType = 'post', parentId = '123' }) {
//   const [comments, setComments] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
//   const { user, token, isAuthenticated, loading: authLoading } = useAuth();

//   useEffect(() => {
//     const handleMouseMove = (e) => {
//       setMousePosition({
//         x: (e.clientX - window.innerWidth / 2) / 50,
//         y: (e.clientY - window.innerHeight / 2) / 50
//       });
//     };
//     window.addEventListener('mousemove', handleMouseMove);
//     return () => window.removeEventListener('mousemove', handleMouseMove);
//   }, []);

//   const fetchComments = useCallback(async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const response = await fetch(`/api/comments?parentType=${encodeURIComponent(parentType)}&parentId=${encodeURIComponent(parentId)}`);
//       if (!response.ok) {
//         throw new Error(`HTTP ${response.status}: ${response.statusText}`);
//       }
//       const data = await response.json();
//       setComments(Array.isArray(data) ? data : []);
//     } catch (err) {
//       console.error('Fetch comments error:', err);
//       setError(err.message);
//       setComments([]);
//     } finally {
//       setLoading(false);
//     }
//   }, [parentType, parentId]);

//   useEffect(() => {
//     if (!authLoading) {
//       fetchComments();
//     }
//   }, [fetchComments, authLoading]);

//   const generateStars = () => {
//     return Array.from({ length: 50 }, (_, i) => ({
//       id: i,
//       x: Math.random() * 100,
//       y: Math.random() * 100,
//       size: Math.random() * 2 + 1,
//       delay: Math.random() * 2
//     }));
//   };

//   const stars = generateStars();

//   if (authLoading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-b from-indigo-950 via-purple-900 to-black flex items-center justify-center">
//         <div className="text-center">
//           <div className="inline-block relative mb-4">
//             <div className="w-12 h-12 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
//             <div className="absolute inset-0 w-12 h-12 border-4 border-purple-400 border-b-transparent rounded-full animate-spin" style={{ animationDirection: 'reverse' }}></div>
//           </div>
//           <p className="text-white/70 animate-pulse">Initializing...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <>
//       <style>{`
//         ::-webkit-scrollbar {
//           width: 12px;
//         }
//         ::-webkit-scrollbar-track {
//           background: linear-gradient(to bottom, #1e1b4b, #581c87);
//           border-radius: 10px;
//         }
//         ::-webkit-scrollbar-thumb {
//           background: linear-gradient(to bottom, #3b82f6, #8b5cf6);
//           border-radius: 10px;
//           border: 2px solid #1e1b4b;
//         }
//         ::-webkit-scrollbar-thumb:hover {
//           background: linear-gradient(to bottom, #2563eb, #7c3aed);
//         }
//         * {
//           scrollbar-width: thin;
//           scrollbar-color: #8b5cf6 #1e1b4b;
//         }
//         @keyframes float {
//           0%, 100% { transform: translateY(0px) rotate(0deg); }
//           50% { transform: translateY(-20px) rotate(180deg); }
//         }
//         @keyframes fade-in-up {
//           from { opacity: 0; transform: translateY(30px); }
//           to { opacity: 1; transform: translateY(0); }
//         }
//         @keyframes glow {
//           0%, 100% { filter: brightness(1); }
//           50% { filter: brightness(1.2); }
//         }
//         .animate-fade-in-up {
//           animation: fade-in-up 0.6s ease-out forwards;
//         }
//         .animate-glow {
//           animation: glow 3s ease-in-out infinite;
//         }
//       `}</style>

//       <div className="min-h-screen bg-gradient-to-b from-indigo-950 via-purple-900 to-black relative overflow-hidden">
//         <div className="absolute inset-0">
//           {stars.map(star => (
//             <div
//               key={star.id}
//               className="absolute bg-white rounded-full animate-pulse"
//               style={{
//                 left: `${star.x}%`,
//                 top: `${star.y}%`,
//                 width: `${star.size}px`,
//                 height: `${star.size}px`,
//                 animationDelay: `${star.delay}s`,
//                 transform: `translate(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.5}px)`
//               }}
//             />
//           ))}
//         </div>
//         <div className="absolute inset-0 overflow-hidden pointer-events-none">
//           {Array.from({ length: 10 }, (_, i) => (
//             <div
//               key={i}
//               className="absolute w-2 h-2 bg-blue-400 rounded-full opacity-30 animate-float"
//               style={{
//                 left: `${Math.random() * 100}%`,
//                 top: `${Math.random() * 100}%`,
//                 animationDelay: `${Math.random() * 5}s`,
//                 animationDuration: `${3 + Math.random() * 4}s`
//               }}
//             />
//           ))}
//         </div>
//         <div className="relative z-10 max-w-4xl mx-auto py-12 px-4">
//           <div className="text-center mb-12">
//             <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-glow">
//               Community Discussion
//             </h1>
//             <div className="w-32 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
//             {user && (
//               <div className="mt-4 text-white/70">
//                 Welcome back, <span className="text-blue-300 font-semibold">{user.username || user.name || 'Space Explorer'}</span>!
//               </div>
//             )}
//           </div>
//           <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 shadow-2xl">
//             <div className="mb-8">
//               <h3 className="text-2xl font-semibold text-white mb-6 flex items-center gap-3">
//                 <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
//                 </svg>
//                 Join the Discussion
//               </h3>
//               {isAuthenticated ? (
//                 <CommentForm 
//                   parentType={parentType} 
//                   parentId={parentId} 
//                   onComment={fetchComments} 
//                   userToken={token} 
//                 />
//               ) : (
//                 <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 backdrop-blur-md border border-yellow-500/30 rounded-2xl p-6 text-center">
//                   <div className="text-yellow-300 text-4xl mb-3">🚀</div>
//                   <p className="text-yellow-200 font-semibold mb-2">Join the Space Community!</p>
//                   <p className="text-yellow-100/80 mb-4">
//                     Please <span className="text-blue-300 underline cursor-pointer hover:text-blue-200">log in</span> or{' '}
//                     <span className="text-purple-300 underline cursor-pointer hover:text-purple-200">sign up</span> to share your thoughts and engage with fellow space enthusiasts.
//                   </p>
//                 </div>
//               )}
//             </div>
//             <div className="space-y-0">
//               {loading ? (
//                 <div className="text-center py-12">
//                   <div className="inline-block relative">
//                     <div className="w-12 h-12 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
//                     <div className="absolute inset-0 w-12 h-12 border-4 border-purple-400 border-b-transparent rounded-full animate-spin" style={{ animationDirection: 'reverse' }}></div>
//                   </div>
//                   <p className="text-white/70 mt-4 animate-pulse">Loading cosmic discussions...</p>
//                 </div>
//               ) : error ? (
//                 <div className="text-center py-12">
//                   <div className="text-red-400 text-4xl mb-4">⚠️</div>
//                   <p className="text-red-300 text-lg mb-4">Failed to load comments</p>
//                   <p className="text-white/60 mb-4">{error}</p>
//                   <button 
//                     onClick={fetchComments}
//                     className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors duration-300"
//                     aria-label="Retry loading comments"
//                   >
//                     Try Again
//                   </button>
//                 </div>
//               ) : comments.length === 0 ? (
//                 <div className="text-center py-12">
//                   <div className="text-white/40 text-5xl mb-4">💬</div>
//                   <p className="text-white/60 text-lg">No comments yet. Be the first to start the conversation!</p>
//                 </div>
//               ) : (
//                 <div className="space-y-0">
//                   <div className="flex items-center gap-3 mb-6 text-white/70">
//                     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
//                     </svg>
//                     <span>{comments.length} {comments.length === 1 ? 'Comment' : 'Comments'}</span>
//                   </div>
//                   {comments.map(comment => (
//                     <Comment
//                       key={comment._id}
//                       comment={comment}
//                       parentType={parentType}
//                       parentId={parentId}
//                       onComment={fetchComments}
//                       userToken={token}
//                       isAuthenticated={isAuthenticated}
//                       currentUserId={user?.id}
//                       depth={0}
//                     />
//                   ))}
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }



import { useEffect, useState, useCallback } from 'react';

// Authentication hook
const useAuth = () => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const storedToken = localStorage.getItem('userToken');
      const storedUser = localStorage.getItem('user');
      
      if (storedToken) {
        setToken(storedToken);
        try {
          const payload = JSON.parse(atob(storedToken.split('.')[1]));
          setUser(storedUser ? JSON.parse(storedUser) : { 
            id: payload.id || payload.userId, 
            username: payload.username || payload.name || 'User',
            email: payload.email 
          });
        } catch (decodeError) {
          console.warn('Token decode failed:', decodeError);
          if (storedUser) {
            setUser(JSON.parse(storedUser));
          }
        }
      }
    } catch (error) {
      console.warn('Auth initialization failed:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const login = (userData, authToken) => {
    setUser(userData);
    setToken(authToken);
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('userToken', authToken);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('user');
    localStorage.removeItem('userToken');
  };

  return { 
    user, 
    token, 
    login, 
    logout, 
    isAuthenticated: !!token && !!user,
    loading 
  };
};

function CommentForm({ parentType, parentId, parentComment, onComment, userToken, onCancel = null }) {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);

  const showToast = useCallback((message, type = 'success') => {
    const existingToasts = document.querySelectorAll('.toast-notification');
    existingToasts.forEach(toast => toast.remove());

    const toast = document.createElement('div');
    toast.className = `toast-notification fixed top-4 right-4 z-50 px-6 py-3 rounded-lg text-white font-medium transform transition-all duration-300 ${
      type === 'success' ? 'bg-green-500' : 'bg-red-500'
    }`;
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
      if (document.body.contains(toast)) {
        toast.style.transform = 'translateX(400px)';
        setTimeout(() => {
          if (document.body.contains(toast)) {
            document.body.removeChild(toast);
          }
        }, 300);
      }
    }, 3000);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!content.trim()) {
      showToast('Please enter a comment', 'error');
      return;
    }
    
    if (!userToken) {
      showToast('Please log in to comment', 'error');
      return;
    }

    setLoading(true);
    
    try {
      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userToken}`
        },
        body: JSON.stringify({
          content: content.trim(),
          parentType,
          parentId,
          parentComment
        })
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || errorData.message || `HTTP ${response.status}: ${response.statusText}`);
      }
      
      const responseData = await response.json();
      showToast(parentComment ? 'Reply posted successfully!' : 'Comment posted successfully!');
      setContent('');
      
      if (onComment) {
        onComment(responseData);
      }
      
      if (onCancel) {
        onCancel();
      }
    } catch (err) {
      console.error('Comment submission error:', err);
      showToast(err.message || 'Failed to post comment', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 mb-6">
      <div className="relative">
        <textarea
          className="w-full px-4 py-3 bg-white/5 backdrop-blur-md border border-white/20 rounded-2xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none min-h-[100px]"
          placeholder={parentComment ? "Share your thoughts on this comment..." : "Share your thoughts about the cosmos..."}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          maxLength={1000}
          disabled={loading}
          required
          aria-label="Comment input"
        />
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl blur opacity-0 focus-within:opacity-20 transition-opacity duration-300 -z-10"></div>
        <div className="absolute bottom-3 right-3 text-xs text-white/40">
          {content.length}/1000
        </div>
      </div>
      
      <div className="flex gap-3 self-end">
        {onCancel && (
          <button
            type="button"
            className="px-4 py-2 text-white/70 hover:text-white border border-white/20 hover:border-white/40 rounded-xl transition-all duration-300 disabled:opacity-50"
            onClick={onCancel}
            disabled={loading}
            aria-label="Cancel reply"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          disabled={loading || !content.trim()}
          aria-label={parentComment ? "Submit reply" : "Submit comment"}
        >
          {loading ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Posting...
            </div>
          ) : (
            <div className="flex items-center gap-2">
              {parentComment ? (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                  </svg>
                  Reply
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  Comment
                </>
              )}
            </div>
          )}
        </button>
      </div>
    </form>
  );
}

function Comment({ comment, parentType, parentId, onComment, userToken, isAuthenticated, currentUserId, depth = 0 }) {
  const [showReply, setShowReply] = useState(false);
  const [likeCount, setLikeCount] = useState(comment.likes?.length || 0);
  const [liked, setLiked] = useState(false);
  const [likingInProgress, setLikingInProgress] = useState(false);

  const showToast = useCallback((message, type = 'success') => {
    const existingToasts = document.querySelectorAll('.toast-notification');
    existingToasts.forEach(toast => toast.remove());

    const toast = document.createElement('div');
    toast.className = `toast-notification fixed top-4 right-4 z-50 px-6 py-3 rounded-lg text-white font-medium transform transition-all duration-300 ${
      type === 'success' ? 'bg-green-500' : 'bg-red-500'
    }`;
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
      if (document.body.contains(toast)) {
        toast.style.transform = 'translateX(400px)';
        setTimeout(() => {
          if (document.body.contains(toast)) {
            document.body.removeChild(toast);
          }
        }, 300);
      }
    }, 3000);
  }, []);

  useEffect(() => {
    if (!userToken || !comment.likes) {
      setLiked(false);
      return;
    }
    
    try {
      let userId = currentUserId;
      if (!userId && userToken) {
        try {
          const payload = JSON.parse(atob(userToken.split('.')[1]));
          userId = payload.id || payload.userId || payload.sub;
        } catch (decodeError) {
          console.warn('Could not decode user ID from token');
        }
      }
      
      if (userId) {
        setLiked(comment.likes.includes(userId));
      }
    } catch (error) {
      console.warn('Error checking like status:', error);
      setLiked(false);
    }
  }, [userToken, comment.likes, currentUserId]);

  const handleLike = async () => {
    if (!isAuthenticated || !userToken) {
      showToast('Please log in to like comments', 'error');
      return;
    }

    if (likingInProgress) return;

    setLikingInProgress(true);

    try {
      const response = await fetch(`/api/comments/${comment._id}/like`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userToken}`
        }
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || errorData.message || `HTTP ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      setLikeCount(data.likes || data.likeCount || (liked ? likeCount - 1 : likeCount + 1));
      setLiked(!liked);
      showToast(liked ? 'Comment unliked' : 'Comment liked');
      if (onComment) onComment();
    } catch (err) {
      console.error('Like error:', err);
      showToast(err.message || 'Failed to update like', 'error');
    } finally {
      setLikingInProgress(false);
    }
  };

  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      const now = new Date();
      const diffMs = now - date;
      const diffMins = Math.floor(diffMs / (1000 * 60));
      const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
      const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

      if (isNaN(date.getTime())) return 'Recently';
      if (diffMins < 1) return 'Just now';
      if (diffMins < 60) return `${diffMins}m ago`;
      if (diffHours < 24) return `${diffHours}h ago`;
      if (diffDays < 7) return `${diffDays}d ago`;
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    } catch (error) {
      return 'Recently';
    }
  };

  const handleReplySubmit = () => {
    setShowReply(false);
    if (onComment) onComment();
  };

  return (
    <div className={`relative ${depth > 0 ? 'ml-6 border-l border-white/10 pl-4' : ''}`}>
      <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-4 mb-4 hover:bg-white/10 hover:border-white/20 transition-all duration-300 group">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full flex items-center justify-center text-white font-semibold text-sm">
              {(comment.author || 'U').charAt(0).toUpperCase()}
            </div>
            <div>
              <span className="font-semibold text-blue-300 group-hover:text-blue-200 transition-colors duration-300">
                {comment.author || 'Anonymous'}
              </span>
              <div className="flex items-center gap-2 text-xs text-white/60">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {formatDate(comment.createdAt)}
              </div>
            </div>
          </div>
          {depth === 0 && comment._id && (
            <div className="text-xs text-white/40 bg-white/5 px-2 py-1 rounded-full">
              #{comment._id.slice(-6)}
            </div>
          )}
        </div>
        <div className="mb-4 text-white/90 leading-relaxed whitespace-pre-wrap">
          {comment.content}
        </div>
        <div className="flex items-center gap-6">
          <button
            className={`flex items-center gap-2 text-sm transition-all duration-300 ${
              liked ? 'text-red-400 hover:text-red-300' : 'text-white/60 hover:text-red-400'
            } disabled:opacity-50 disabled:cursor-not-allowed`}
            onClick={handleLike}
            disabled={!isAuthenticated || likingInProgress}
            aria-label={isAuthenticated ? (liked ? 'Unlike comment' : 'Like comment') : 'Log in to like'}
          >
            {likingInProgress ? (
              <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <svg className={`w-4 h-4 transition-all duration-300 ${liked ? 'fill-current' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            )}
            <span>{likeCount}</span>
          </button>
          {isAuthenticated && depth < 3 && (
            <button
              className="flex items-center gap-2 text-sm text-white/60 hover:text-blue-400 transition-colors duration-300"
              onClick={() => setShowReply(!showReply)}
              aria-label={showReply ? 'Cancel reply' : 'Reply to comment'}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
              </svg>
              {showReply ? 'Cancel' : 'Reply'}
            </button>
          )}
        </div>
      </div>
      {showReply && isAuthenticated && (
        <div className="mb-4 animate-fade-in-up">
          <CommentForm
            parentType={parentType}
            parentId={parentId}
            parentComment={comment._id}
            onComment={handleReplySubmit}
            userToken={userToken}
            onCancel={() => setShowReply(false)}
          />
        </div>
      )}
      {comment.replies && comment.replies.length > 0 && (
        <div className="space-y-0">
          {comment.replies.map(reply => (
            <Comment
              key={reply._id}
              comment={reply}
              parentType={parentType}
              parentId={parentId}
              onComment={onComment}
              userToken={userToken}
              isAuthenticated={isAuthenticated}
              currentUserId={currentUserId}
              depth={depth + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function CommentSection({ parentType = 'post', parentId = '123' }) {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isCommentsVisible, setIsCommentsVisible] = useState(true);
  const { user, token, isAuthenticated, loading: authLoading } = useAuth();

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX - window.innerWidth / 2) / 50,
        y: (e.clientY - window.innerHeight / 2) / 50
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const fetchComments = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/comments?parentType=${encodeURIComponent(parentType)}&parentId=${encodeURIComponent(parentId)}`);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      const data = await response.json();
      setComments(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Fetch comments error:', err);
      setError(err.message);
      setComments([]);
    } finally {
      setLoading(false);
    }
  }, [parentType, parentId]);

  useEffect(() => {
    if (!authLoading) {
      fetchComments();
    }
  }, [fetchComments, authLoading]);

  const generateStars = () => {
    return Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      delay: Math.random() * 2
    }));
  };

  const stars = generateStars();

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-indigo-950 via-purple-900 to-black flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block relative mb-4">
            <div className="w-12 h-12 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
            <div className="absolute inset-0 w-12 h-12 border-4 border-purple-400 border-b-transparent rounded-full animate-spin" style={{ animationDirection: 'reverse' }}></div>
          </div>
          <p className="text-white/70 animate-pulse">Initializing...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <style>{`
        ::-webkit-scrollbar {
          width: 12px;
        }
        ::-webkit-scrollbar-track {
          background: linear-gradient(to bottom, #1e1b4b, #581c87);
          border-radius: 10px;
        }
        ::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #3b82f6, #8b5cf6);
          border-radius: 10px;
          border: 2px solid #1e1b4b;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #2563eb, #7c3aed);
        }
        * {
          scrollbar-width: thin;
          scrollbar-color: #8b5cf6 #1e1b4b;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes glow {
          0%, 100% { filter: brightness(1); }
          50% { filter: brightness(1.2); }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
        }
        .animate-glow {
          animation: glow 3s ease-in-out infinite;
        }
        .collapsible-container {
          transition: max-height 0.5s ease-in-out, opacity 0.5s ease-in-out;
          overflow: hidden;
        }
        .collapsible-container.collapsed {
          max-height: 0;
          opacity: 0;
        }
        .collapsible-container.expanded {
          max-height: 1000px; /* Adjust as needed for content */
          opacity: 1;
        }
      `}</style>

      <div className="min-h-screen bg-gradient-to-b from-indigo-950 via-purple-900 to-black relative overflow-hidden">
        <div className="absolute inset-0">
          {stars.map(star => (
            <div
              key={star.id}
              className="absolute bg-white rounded-full animate-pulse"
              style={{
                left: `${star.x}%`,
                top: `${star.y}%`,
                width: `${star.size}px`,
                height: `${star.size}px`,
                animationDelay: `${star.delay}s`,
                transform: `translate(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.5}px)`
              }}
            />
          ))}
        </div>
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {Array.from({ length: 10 }, (_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-blue-400 rounded-full opacity-30 animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 4}s`
              }}
            />
          ))}
        </div>
        <div className="relative z-10 max-w-4xl mx-auto py-12 px-4">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-glow">
              Community Discussion
            </h1>
            <div className="w-32 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
            {user && (
              <div className="mt-4 text-white/70">
                Welcome back, <span className="text-blue-300 font-semibold">{user.username || user.name || 'Space Explorer'}</span>!
              </div>
            )}
          </div>
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 shadow-2xl">
            <div className="mb-8">
              <h3 className="text-2xl font-semibold text-white mb-6 flex items-center gap-3">
                <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                Join the Discussion
              </h3>
              {isAuthenticated ? (
                <CommentForm 
                  parentType={parentType} 
                  parentId={parentId} 
                  onComment={fetchComments} 
                  userToken={token} 
                />
              ) : (
                <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 backdrop-blur-md border border-yellow-500/30 rounded-2xl p-6 text-center">
                  <div className="text-yellow-300 text-4xl mb-3">🚀</div>
                  <p className="text-yellow-200 font-semibold mb-2">Join the Space Community!</p>
                  <p className="text-yellow-100/80 mb-4">
                    Please <span className="text-blue-300 underline cursor-pointer hover:text-blue-200">log in</span> or{' '}
                    <span className="text-purple-300 underline cursor-pointer hover:text-purple-200">sign up</span> to share your thoughts and engage with fellow space enthusiasts.
                  </p>
                </div>
              )}
            </div>
            <div className="space-y-0">
              {loading ? (
                <div className="text-center py-12">
                  <div className="inline-block relative">
                    <div className="w-12 h-12 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
                    <div className="absolute inset-0 w-12 h-12 border-4 border-purple-400 border-b-transparent rounded-full animate-spin" style={{ animationDirection: 'reverse' }}></div>
                  </div>
                  <p className="text-white/70 mt-4 animate-pulse">Loading cosmic discussions...</p>
                </div>
              ) : error ? (
                <div className="text-center py-12">
                  <div className="text-red-400 text-4xl mb-4">⚠️</div>
                  <p className="text-red-300 text-lg mb-4">Failed to load comments</p>
                  <p className="text-white/60 mb-4">{error}</p>
                  <button 
                    onClick={fetchComments}
                    className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors duration-300"
                    aria-label="Retry loading comments"
                  >
                    Try Again
                  </button>
                </div>
              ) : comments.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-white/40 text-5xl mb-4">💬</div>
                  <p className="text-white/60 text-lg">No comments yet. Be the first to start the conversation!</p>
                </div>
              ) : (
                <div className="space-y-0">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3 text-white/70">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                      <span>{comments.length} {comments.length === 1 ? 'Comment' : 'Comments'}</span>
                    </div>
                    <button
                      onClick={() => setIsCommentsVisible(!isCommentsVisible)}
                      className="flex items-center gap-2 px-4 py-2 text-white/70 hover:text-white border border-white/20 hover:border-white/40 rounded-xl transition-all duration-300"
                      aria-label={isCommentsVisible ? 'Hide comments' : 'Show comments'}
                    >
                      {isCommentsVisible ? (
                        <>
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                          </svg>
                          Hide Comments
                        </>
                      ) : (
                        <>
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                          Show Comments
                        </>
                      )}
                    </button>
                  </div>
                  <div className={`collapsible-container ${isCommentsVisible ? 'expanded' : 'collapsed'}`}>
                    {comments.map(comment => (
                      <Comment
                        key={comment._id}
                        comment={comment}
                        parentType={parentType}
                        parentId={parentId}
                        onComment={fetchComments}
                        userToken={token}
                        isAuthenticated={isAuthenticated}
                        currentUserId={user?.id}
                        depth={0}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}