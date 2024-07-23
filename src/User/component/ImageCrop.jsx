import React, { useRef, useCallback,useState, useEffect } from 'react';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import { uploadPhoto } from '../auth/authUser';
import { Button, message } from 'antd';
const ImageCrop = ({ image }) => {
    const [uploading, setUploading] = useState(false);

    const cropperRef = useRef(null);

    const _crop = useCallback(() => {
        if (cropperRef.current) {
            const croppedImage = cropperRef.current.getCroppedCanvas().toDataURL();
            // Handle the cropped image data URL as needed
        }
    }, []);
    useEffect(() => {

    },[])
    const handleSubmit = useCallback(async () => {
        setUploading(true);
        const croppedCanvas = cropperRef.current.getCroppedCanvas();
        if (!croppedCanvas) {
            console.error('No cropped image available');
            return;
        }
    
        // Convert canvas to blob
        croppedCanvas.toBlob(async (blob) => {
            if (!blob) {
                console.error('Failed to create blob from cropped image');
                setUploading(false);
                return;
            }
    
            // Call your upload function
            try {
                await uploadPhoto(blob)
                
                // Assuming uploadPhoto accepts a Blob
                console.log('Upload successful');
                message.success('image Uploaded')
                setUploading(false);
            } catch (error) {
                message.error('Upload failed')
                console.error('Upload failed:', error);
                setUploading(false);
            }
        });
    }, []);
    
    const onCropperInit = useCallback((cropper) => {
        cropperRef.current = cropper;
    }, []);

    return (
        <div style={{ width: '100%', height: 'auto' }}>
            <Cropper
                src={image}
                style={{ height: '400px', width: '100%' }}
                initialAspectRatio={1} // Aspect ratio 1:1 for square crop
                guides={false} // Hide the guides
                crop={_crop}
                onInitialized={onCropperInit}
                dragMode="move"
                cropBoxMovable={false}
                cropBoxResizable={false}
                minCropBoxWidth={196}
                minCropBoxHeight={196}
            />
            <div className="upload-button-container flex justify-end my-3 ">
    <Button onClick={handleSubmit} disabled={uploading}
    loading={uploading}
    >
        {uploading ? 'Uploading...' : 'Upload'}
    </Button>
</div>
        </div>
    );
};

export default ImageCrop;
