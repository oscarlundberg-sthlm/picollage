import Head from 'next/head'
import { useEffect, useState } from 'react';
import { PixelImage } from '../components/PixelImage';
import { RenderedVisual } from '../components/RenderedVisual';
import { SourceImage } from '../components/SourceImage';
import classnames from 'classnames';
import { RenderVisualColorized } from '../components/RenderVisualColorized';

export default function Home() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [variant, setVariant] = useState<'grayscale'|'colorized'>('grayscale');
  const [inputImageAverageArray, setInputImageAverageArray] = useState<number[]>([]);
  const [inputImageArray, setInputImageArray] = useState<Array<number[]>>([]);
  const [pixelImage, setPixelImage] = useState<string>();
  const [resolution, setResolution] = useState({ cols: 100, rows: 100});

  return (
    <div className={classnames({
      'bg-black text-white': theme === 'dark',
      'bg-white text-black': theme === 'light',
    }, 'text-sm')}>
      <Head>
        <title>Picollage</title>
      </Head>

      <div className='flex justify-between py-2 px-2'>
        <div className="">
          <SourceImage 
            setInputImageAverageArray={(array: number[]) => setInputImageAverageArray(array)}
            setInputImageArray={(array: number[]) => setInputImageArray(prevState => [...prevState, array])}
            resolution={resolution} 
          />
          <PixelImage 
            setPixelImage={(url) => { setPixelImage(url) }} 
          />
        </div>
        {/* <select name="" id="" 
          onChange={(e: any) => setVariant(e.target.value)} 
          value={variant} 
          className={classnames({
            'bg-white text-black': theme === 'dark',
            'bg-black text-white': theme === 'light',
          })}
          >
          <option value="grayscale">Grayscale</option>
          <option value="color">Color</option>
        </select> */}
        <button 
          onClick={() => setTheme((prevState) => prevState === 'dark' ? 'light' : 'dark')}
          className={classnames({
            'bg-white text-black': theme === 'dark',
            'bg-black text-white': theme === 'light',
          }, 'px-2.5 py-1')}
        >Switch theme</button>
      </div>

      <div className=''>
        { variant === 'grayscale' && 
          <RenderedVisual 
            inputImageAverageArray={inputImageAverageArray} 
            pixelImage={pixelImage}
            resolution={resolution} 
            theme={theme}
          />
        }
        { variant === 'colorized' && 
          <RenderVisualColorized
            inputImageArray={inputImageArray}
            pixelImage={pixelImage}
            resolution={resolution} 
            theme={theme}
          />
        }
      </div>
    </div>
  )
}
