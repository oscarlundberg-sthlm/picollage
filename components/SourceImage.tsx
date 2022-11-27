import React from 'react'
import Resolution from '../interfaces/resolution';

interface Props {
    setInputImageAverageArray: (array: number[]) => void;
    setInputImageArray: (array: number[]) => void;
    resolution: Resolution;
}

export const SourceImage = ({setInputImageAverageArray, setInputImageArray, resolution}: Props) => {

    const pixelArray = (imageSource: string) => {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        const image = new Image();
        image.src = imageSource;
        image.onload = () => {
            // console.log(image.naturalWidth, image.naturalHeight);
            const imageRatio = image.naturalHeight / image.naturalWidth;
            const adjustedImageHeight = resolution.cols * imageRatio;
            context?.drawImage(
                image, 0, (-1 * ((adjustedImageHeight - resolution.rows) / 2)), resolution.cols, adjustedImageHeight,
                // 0, ((adjustedImageHeight - resolution.rows) / 2), resolution.cols, resolution.rows
            );
            const imageData = context?.getImageData(0,0,resolution.cols, resolution.rows);
            // console.log(imageData);
            let pixelArray: number[] = [];
            if (imageData && imageData.data) {
                for (let i = 0; i < imageData.data.length; i += 4) {
                    const average = (
                    imageData.data[i] + 
                    imageData.data[i+1] + 
                    imageData.data[i+2] 
                    ) / 3;
                    pixelArray = [...pixelArray, average];

                    //colorized
                    setInputImageArray([
                            imageData.data[i], 
                            imageData.data[i+1],
                            imageData.data[i+2] 
                    ])
                }
                setInputImageAverageArray(pixelArray);
            }
        }
    }

    const handleSourceImageChange = (e: any) => {
        const reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = () => {
            if (typeof reader.result === 'string') {
            pixelArray(reader.result);
            }
        }
    }

  return (
    <span className="">
        <label htmlFor='source-img' className=''>Image:&nbsp;</label>
        <input type="file" name="" id="source-img" accept='image/*' onChange={handleSourceImageChange} />
    </span>
  )
}
