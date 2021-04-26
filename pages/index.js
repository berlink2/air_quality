import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { promises as fs } from 'fs';
import path from 'path';
import image from 'next/image';

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

  return (
    <div className={styles.container}>
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

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href='https://nextjs.org'>Next.js!</a>
        </h1>

        <p className={styles.description}>
          Get started by editing{' '}
          <code className={styles.code}>pages/index.js</code>
        </p>

        <div className={styles.grid}>
          <a href='https://nextjs.org/docs' className={styles.card}>
            <h3>Documentation &rarr;</h3>
            <p>Find in-depth information about Next.js features and API.</p>
          </a>

          <a href='https://nextjs.org/learn' className={styles.card}>
            <h3>Learn &rarr;</h3>
            <p>Learn about Next.js in an interactive course with quizzes!</p>
          </a>

          <a
            href='https://github.com/vercel/next.js/tree/master/examples'
            className={styles.card}
          >
            <h3>Examples &rarr;</h3>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </a>

          <a
            href='https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app'
            className={styles.card}
          >
            <h3>Deploy &rarr;</h3>
            <p>
              Instantly deploy your Next.js site to a public URL with Vercel.
            </p>
          </a>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href='https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app'
          target='_blank'
          rel='noopener noreferrer'
        >
          Powered by{' '}
          <img src='/vercel.svg' alt='Vercel Logo' className={styles.logo} />
        </a>
      </footer>
    </div>
  );
}
