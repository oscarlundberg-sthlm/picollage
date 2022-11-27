import React from 'react'

interface Props {
    setPixelImage: (url: string) => void;
}

export const PixelImage = ({ setPixelImage }: Props) => {

    const handlePixelImageChange = (e: any) => {
        const reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = () => {
            if (typeof reader.result === 'string') {
                setPixelImage(reader.result);
            }
        }
    }

    return (
        <span className="">
            <label htmlFor='pixel-img' className=''>SVG:&nbsp;</label>
            <input type="file" name="" id="pixel-img" accept='image/svg+xml' onChange={handlePixelImageChange} />
        </span>
    )
}
