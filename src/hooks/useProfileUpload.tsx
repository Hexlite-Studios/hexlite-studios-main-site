// src/hooks/useProfileUpload.ts
import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

export const useProfileUpload = () => {
    const { user } = useAuth();
    const [uploading, setUploading] = useState(false);

    const uploadImage = async (
        file: File, 
        bucket: string, 
        columnName: 'avatar_url' | 'background_url'
    ) => {
        try {
            setUploading(true);
            if (!user) throw new Error('No user logged in');

            const fileExt = file.name.split('.').pop();
            const fileName = `${user.id}/${columnName}_${Date.now()}.${fileExt}`;
            const filePath = `${fileName}`;

            const { error: uploadError } = await supabase.storage
                .from(bucket)
                .upload(filePath, file, { upsert: true });

            if (uploadError) throw uploadError;

            const { data: { publicUrl } } = supabase.storage
                .from(bucket)
                .getPublicUrl(filePath);

            const { error: updateError } = await supabase
                .from('users')
                .update({ [columnName]: publicUrl })
                .eq('id', user.id);

            if (updateError) throw updateError;

            return publicUrl;

        } catch (error: any) {
            console.error('Upload failed:', error.message);
            throw error;
        } finally {
            setUploading(false);
        }
    };

    return { uploadImage, uploading };
};