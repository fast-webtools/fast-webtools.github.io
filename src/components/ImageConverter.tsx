import React, { useState, ChangeEvent } from 'react';
import { Button } from './ui/button.tsx';
import { FileImage, Download } from 'lucide-react';

const ImageConverter: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [convertedImage, setConvertedImage] = useState<string | null>(null);
  const [targetFormat, setTargetFormat] = useState<string>('png');

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setConvertedImage(null);
    }
  };

  const convertImage = () => {
    if (!selectedFile) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0);
          const convertedDataUrl = canvas.toDataURL(`image/${targetFormat}`);
          setConvertedImage(convertedDataUrl);
        }
      };
      img.src = e.target.result as string;
    };
    reader.readAsDataURL(selectedFile);
  };

  const downloadImage = () => {
    if (!convertedImage) return;

    const link = document.createElement('a');
    link.href = convertedImage;
    link.download = `converted-image.${targetFormat}`;
    link.click();
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-4 text-center">Image Format Converter</h1>
      
      <div className="mb-4">
        <input 
          type="file" 
          accept="image/*" 
          onChange={handleFileChange} 
          className="w-full p-2 border rounded"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2">Target Format:</label>
        <select 
          value={targetFormat} 
          onChange={(e) => setTargetFormat(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="png">PNG</option>
          <option value="jpeg">JPEG</option>
          <option value="webp">WebP</option>
        </select>
      </div>

      <div className="flex space-x-4">
        <Button 
          onClick={convertImage} 
          disabled={!selectedFile}
          className="flex-1 flex items-center justify-center"
        >
          <FileImage className="mr-2" /> Convert Image
        </Button>
        
        <Button 
          onClick={downloadImage} 
          disabled={!convertedImage}
          className="flex-1 flex items-center justify-center"
        >
          <Download className="mr-2" /> Download
        </Button>
      </div>

      {convertedImage && (
        <div className="mt-4 text-center">
          <h2 className="mb-2 font-semibold">Converted Image:</h2>
          <img 
            src={convertedImage} 
            alt="Converted" 
            className="mx-auto max-w-full h-auto border rounded"
          />
        </div>
      )}
    </div>
  );
};

export default ImageConverter;
