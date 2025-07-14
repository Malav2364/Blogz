import axiosInstance from '../utils/axiosInstance';

export const createPost = async (postData) => {
  const response = await axiosInstance.post('/api/posts', postData);
  return response.data;
};

export const uploadPostImage = async (file) => {
  const formData = new FormData();
  formData.append('image', file);
  
  const response = await axiosInstance.post('/api/posts/upload-image', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const deletePostById = async (postId) => {
  const response = await axiosInstance.delete(`/api/posts/${postId}`);
  return response.data;
};

export const getPostById = async (id) => {
  const response = await axiosInstance.get(`/api/posts/${id}`);
  return response.data;
};

export const updatePostById = async (id, postData) => {
  const response = await axiosInstance.put(`/api/posts/${id}`, postData);
  return response.data;
};

export const toggleLikePost = async (postId) => {
  const res = await axiosInstance.patch(`/api/posts/${postId}/like`);
  return res.data;
};