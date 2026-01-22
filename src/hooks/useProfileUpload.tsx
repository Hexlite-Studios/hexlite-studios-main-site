// src/hooks/useProfileUpload.ts
import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

export const useProfileUpload = () => {
    const { user } = useAuth();
    const [uploading, setUploading] = useState(false);

    const uploadImage = async (file: File, bucket: string) => {
        try {
            setUploading(true);
            if (!user) throw new Error('No user');

            const fileExt = file.name.split('.').pop();
            const fileName = `${user.id}/${Date.now()}.${fileExt}`;
            const filePath = fileName;

            const { error: uploadError } = await supabase.storage
                .from(bucket)
                .upload(filePath, file, { upsert: true });

            if (uploadError) {
                throw uploadError;
            }

            const { data: { publicUrl } } = supabase.storage
                .from(bucket)
                .getPublicUrl(filePath);

            return publicUrl;
        } catch (errror: any) {
            console.error('Error uploading image:', errror.message);
            throw errror;
        } finally {
            setUploading(false);
        }
    };

    return { uploadImage, uploading };
};