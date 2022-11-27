import React, { Children, useEffect, useRef, useState } from 'react'
import Resolution from '../interfaces/resolution';

interface Props {
    inputImageArray: number[][];
    resolution: Resolution;
    pixelImage: string | undefined;
    theme: 'dark' | 'light';
}

export const RenderVisualColorized = ({inputImageArray, pixelImage, resolution, theme}: Props) => {
    const [size, setSize] = useState(800); //graphic squared size (same width and height)
    const [pixelSize, setPixelSize] = useState<number>();
    const [trTdArrayColorized, setTrTdArrayColorized] = useState<Array<number[][]>>([]);

    // colorized
    const updateTrTdArray = () => {
        setTrTdArrayColorized([]);
        const rowSize = resolution.cols;
        for (let i = 0; i < inputImageArray.length; i += rowSize) {
            const row = inputImageArray.slice(i, i + rowSize);
            setTrTdArrayColorized((prevState) => ([
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
    }, [inputImageArray])

    return (
        <table cellPadding={0} cellSpacing={0} border={0} style={{ height: size + 'px', width: size + 'px' }}>
            <tbody>
                {
                    Children.toArray(trTdArrayColorized.map(value => 
                        <tr>
                                {
                                    value.map((value, index) => (
                                        <td 
                                            key={index} 
                                            height={pixelSize} 
                                            width={pixelSize} 
                                            style={{ 
                                                backgroundImage: `
                                                url(${pixelImage}),
                                                linear-gradient(rgb(${value[0]}, ${value[1]}, ${value[2]}), rgb(${value[0]}, ${value[1]}, ${value[2]}))
                                                `,
                                                backgroundBlendMode: 'overlay',
                                                backgroundSize: 'contain',
                                                backgroundPosition: 'center',
                                                backgroundRepeat: 'no-repeat',
                                                // filter: `brightness(0) ${theme === 'dark' ? 'invert(1)' : '' }`
                                            }}
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
