import { useState, useEffect } from 'react';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { promises as fs } from 'fs';
import path from 'path';
import Image from 'next/image';

// // This function gets called at build time on server-side.
export async function getStaticProps() {
  const postsDirectory = path.join(process.cwd(), 'public/data');
  const filenames = await fs.readdir(postsDirectory);

  // get json files in public/data, parse them, and add to an array
  const data = filenames.map(async (filename) => {
    const filePath = path.join(postsDirectory, filename);
    const fileContents = await fs.readFile(filePath, 'utf8');
    const parsedData = JSON.parse(fileContents);

    return {
      ...parsedData,
    };
  });

  const fetchedData = await Promise.all(data);

  // return parsed data
  return {
    props: {
      englishData: fetchedData[0],
      hindiData: fetchedData[1],
    },
  };
}

export default function Home(props) {
  const { englishData, hindiData } = props;
  const [data, setData] = useState(() => englishData);
  const [language, setLanguage] = useState('english');
  const [cityData] = useState(() => {
    return Array.from({ length: 32 }).map((_, index) => {
      return {
        cityName: data[`compare-tabs_1_city_${index + 1}_name`],
        aqi: data[`compare-tabs_1_city_${index + 1}_aqi`],
        cigg: data[`compare-tabs_1_city_${index + 1}_cigg`],
      };
    });
  });
  const [selectedCityIndex, setSelectedCityIndex] = useState(() => 0);
  const ciggNum = Number(cityData[selectedCityIndex].cigg);

  useEffect(() => {
    if (language === 'english') {
      setData(englishData);
    } else {
      setData(hindiData);
    }
  }, [language]);

  return (
    <>
      <Head>
        <html lang={language === 'english' ? 'en' : 'hi'} />
        <title>{data.hero_1_title}</title>
        <link rel='icon' href='/favicon.ico' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <meta charSet='utf-8' />

        <meta property='og:title' content={data.hero_1_title} key='ogtitle' />
      </Head>

      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.logo}>
            <a
              target='_blank'
              rel='noreferrer'
              href={data['article-info_1_category_url']}
            >
              BBC
            </a>
          </div>

          <div className={styles.language}>
            <button
              onClick={() => {
                setLanguage('english');
              }}
            >
              <Image width={25} height={25} src='/img/uk-flag.png' />
            </button>
          </div>
          <div className={styles.spacerSmall} />
          <div>
            <button
              onClick={() => {
                setLanguage('hindi');
              }}
            >
              <Image width={25} height={25} src='/img/india-flag.png' />
            </button>
          </div>
        </header>
        <main className={styles.main}>
          <div className={styles.content}>
            <article className={styles.article}>
              <h1 id='main-heading' className={styles.title} tabIndex={-1}>
                {data.hero_1_title}
              </h1>

              <br />
              <p style={{ alignSelf: 'flex-start' }}>
                <span>
                  <strong>{data['article-info_1_byline']}</strong>
                </span>
              </p>
              <div style={{ alignSelf: 'flex-start' }}>
                <span className={styles.publishDate}>
                  {data['article-info_1_date']}
                </span>
              </div>
              <div className={styles.heroImage}>
                <Image
                  src={data.hero_1_image}
                  height={500}
                  width={1000}
                  objectFit='intrinsic'
                  layout='responsive'
                  loading='eager'
                  alt='Two Indians on a motorcycle breathe in the Smog'
                />
              </div>
              <br />
              <p className={styles.p1}>{data.p_1_value}</p>
              <p>{data.p_2_value}</p>
              <p>{data.p_3_value}</p>
              <p>{data.p_4_value}</p>
              <p>{data.p_5_value}</p>

              <div className={styles.dropdownWrapper}>
                <span id='city-selector'>{data['compare-tabs_1_title']}:</span>
                <select
                  value={selectedCityIndex}
                  onChange={(e) => {
                    setSelectedCityIndex(e.currentTarget.value);
                  }}
                  aria-labelledby='city-selector'
                  defaultValue={0}
                >
                  {Array.from({ length: 32 }).map((_, index) => {
                    return (
                      <option data-option={index} key={index} value={index}>
                        {data[`compare-tabs_1_city_${index + 1}_name`]}
                      </option>
                    );
                  })}
                </select>
              </div>

              <div className={styles.cityData}>
                <p>
                  Air Quality Index of {cityData[selectedCityIndex].cityName}
                </p>
                <p>
                  {' '}
                  <strong>{cityData[selectedCityIndex].aqi}</strong>
                </p>
                <p>
                  Equivalent to smoking{' '}
                  <strong>{cityData[selectedCityIndex].cigg}</strong> cigarettes
                </p>
              </div>

              <div className={styles.ciggs}>
                {Array.from({ length: ciggNum }).map((_, index) => {
                  return (
                    <Image
                      src='/img/ciggrette_icon.png'
                      width={15}
                      height={50}
                    />
                  );
                })}
              </div>

              <p className={styles.p6}>
                <strong>{data.p_6_value}</strong>
              </p>
              <p>{data.p_7_value}</p>
              <p>{data.p_8_value}</p>
              <p>{data.p_9_value}</p>
              <p>{data.p_10_value}</p>
            </article>
          </div>
        </main>
      </div>
    </>
  );
}
