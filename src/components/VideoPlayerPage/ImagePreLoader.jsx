/* eslint-disable react/prop-types */
import { useEffect } from "react";

const ImagePreloader = ({ imageUrls, onLoaded }) => {
  useEffect(() => {
    const loadImages = async () => {
      try {
        await Promise.all(
          imageUrls.map(url => 
            new Promise((resolve, reject) => {
              const img = new Image();
              img.src = url;
              img.onload = () => resolve(url);
              img.onerror = () => reject(new Error(`Failed to load image at ${url}`));
            })
          )
        );
        if (onLoaded) onLoaded();
      } catch (error) {
        console.error("Error preloading images:", error);
      }
    };

    loadImages();
  }, [imageUrls, onLoaded]);

  return null;
};
export default ImagePreloader;
