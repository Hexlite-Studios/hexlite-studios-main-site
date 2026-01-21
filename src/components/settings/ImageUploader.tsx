import { useRef } from 'react';
import { useProfileUpload } from '../../hooks/useProfileUpload';
import { Camera } from 'lucide-react';

interface ImageUploaderProps {
    currentImage: string | null;
    type: 'avatar' | 'background';
    onUploadComplete: (url: string) => void;
    isSupporter?: boolean;
    children?: React.ReactNode;
}

export default function ImageUploader({ 
    currentImage, 
    type, 
    onUploadComplete, 
    isSupporter = false, 
    children 
}: ImageUploaderProps) {
    const { uploadImage, uploading } = useProfileUpload();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const acceptedTypes = isSupporter 
        ? "image/png, image/jpeg, image/webp, image/gif" 
        : "image/png, image/jpeg, image/webp";

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files || event.target.files.length === 0) return;
        
        const file = event.target.files[0];

        if (file.type === 'image/gif' && !isSupporter) {
            alert("Animated avatars (GIFs) are a Supporter-only feature! 💎");
            return;
        }

        const limit = file.type === 'image/gif' ? 10 * 1024 * 1024 : 5 * 1024 * 1024;
        if (file.size > limit) {
             alert(`File is too big! Max size is ${limit / 1024 / 1024}MB.`);
             return;
        }

        try {
            const colName = type === 'avatar' ? 'avatar_url' : 'background_url';
            const bucketName = type === 'avatar' ? 'avatars' : 'backgrounds';
            const newUrl = await uploadImage(file, bucketName, colName);
            onUploadComplete(newUrl);
        } catch (error) {
            alert('Error uploading image');
        }
    };

if (children) {
    return (
        <div 
            onClick={() => fileInputRef.current?.click()} 
            className="cursor-pointer w-full h-full block" 
        >
            {children}
            <input 
                type="file" 
                ref={fileInputRef}
                onChange={handleFileChange}
                accept={acceptedTypes}
                className="hidden"
                disabled={uploading}
            />
        </div>
    );
}

    const displayImage = currentImage || (type === 'avatar' ? '/default-avatar.png' : '/default-bg.png');

    return (
        <div className="relative group cursor-pointer" onClick={() => fileInputRef.current?.click()}>
            <div className={`
                overflow-hidden border-2 border-zinc-700 bg-zinc-800
                ${type === 'avatar' ? 'w-24 h-24 rounded-full' : 'w-full h-48 rounded-xl'}
            `}>
                <img 
                    src={displayImage} 
                    alt="Upload preview" 
                    className={`w-full h-full object-cover transition-opacity ${uploading ? 'opacity-50' : ''}`}
                />
                {uploading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                    </div>
                )}
            </div>

            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 backdrop-blur-sm">
                <Camera className="w-6 h-6 text-white" />
            </div>

            <input 
                type="file" 
                ref={fileInputRef}
                onChange={handleFileChange}
                accept={acceptedTypes}
                className="hidden"
            />
        </div>
    );
}