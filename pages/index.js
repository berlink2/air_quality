import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { promises as fs } from 'fs';
import path from 'path';
import Image from 'next/image';

// // This function gets called at build time on server-side.
export async function getStaticProps() {
  // const englishData = await import('../public/data/english.json').default;

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
  console.log(englishData);

  return (
    <>
      <Head>
        <html lang='en' />
        <title>{englishData.hero_1_title}</title>
        <link rel='icon' href='/favicon.ico' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <meta charSet='utf-8' />

        <meta
          property='og:title'
          content={englishData.hero_1_title}
          key='ogtitle'
        />
      </Head>

      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.logo}>BBC</div>
          <div className={styles.language}>
            <span>
              <Image
                loading='lazy'
                width={25}
                height={25}
                src='/img/uk-flag.png'
              />
            </span>
          </div>
          <div className={styles.spacerSmall} />
          <div>
            <span>
              <Image
                loading='lazy'
                width={25}
                height={25}
                src='/img/india-flag.png'
              />
            </span>
          </div>
        </header>
        <main className={styles.main}>
          <div className={styles.content}>
            <article className={styles.article}>
              <h1 id='main-heading' className={styles.title} tabIndex={-1}>
                {englishData.hero_1_title}
              </h1>
              <br />
              <p>
                <span>
                  <strong>{englishData['article-info_1_byline']}</strong>
                </span>
              </p>
              <div>
                <span className={styles.publishDate}>
                  {englishData['article-info_1_date']}
                </span>
              </div>
              <hr></hr>
              <div className={styles.heroImage}>
                <Image
                  src={englishData.hero_1_image}
                  height={250}
                  width={500}
                  objectFit='intrinsic'
                  layout='responsive'
                  loading='eager'
                  alt='Two Indians on a motorcycle breathe in the Smog'
                />
              </div>
              <br />
              <p className={styles.p1}>{englishData.p_1_value}</p>
              <p>{englishData.p_2_value}</p>
              <p>{englishData.p_3_value}</p>
              <p>{englishData.p_4_value}</p>
              <p>{englishData.p_5_value}</p>
            </article>
          </div>
        </main>
      </div>
    </>
  );
}
