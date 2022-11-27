import React, { Children, useEffect, useRef, useState } from 'react'
import Resolution from '../interfaces/resolution';

interface Props {
    inputImageAverageArray: number[];
    resolution: Resolution;
    pixelImage: string | undefined;
    theme: 'dark' | 'light';
}

export const RenderedVisual = ({inputImageAverageArray, pixelImage, resolution, theme}: Props) => {
    const [size, setSize] = useState(800); //graphic squared size (same width and height)
    const [pixelSize, setPixelSize] = useState<number>();
    const [trTdArray, setTrTdArray] = useState<Array<number[]>>([]);

    const updateTrTdArray = () => {
        setTrTdArray([]);
        const rowSize = resolution.cols;
        for (let i = 0; i < inputImageAverageArray.length; i += rowSize) {
            const row = inputImageAverageArray.slice(i, i + rowSize);
            setTrTdArray((prevState) => ([
                ...prevState,
                row
            ]))
        }
    }

    useEffect(() => {
        setPixelSize(size/(resolution.cols*resolution.rows));
    }, [size]);

    useEffect(() => {
        updateTrTdArray();
    }, [inputImageAverageArray])

    return (
        <table cellPadding={0} cellSpacing={0} border={0} style={{ height: size + 'px', width: size + 'px' }}>
            <tbody>
                {
                    Children.toArray(trTdArray.map(value => 
                        <tr>
                                {
                                    value.map((value, index) => (
                                        <td 
                                            key={index} 
                                            height={pixelSize} 
                                            width={pixelSize} 
                                            style={{ 
                                                opacity: theme === 'dark' ? (value / 255) : ((255 - value) / 255),
                                                backgroundImage: `url(${pixelImage})`,
                                                backgroundSize: 'contain',
                                                backgroundPosition: 'center',
                                                backgroundRepeat: 'no-repeat',
                                                filter: `brightness(0) ${theme === 'dark' ? 'invert(1)' : '' }`
                                            }}
                                            className="transition-colors"
                                            >
                                        </td>
                                    ))
                                }
                            </tr>
                    ))   
                }
            </tbody>
        </table>
    )
}
