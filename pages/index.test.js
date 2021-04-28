import React from 'react';
import 'jest-axe/extend-expect';
import { waitFor, render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import Index from './index';
import path from 'path';
import { promises as fs } from 'fs';
import user from '@testing-library/user-event';

const getData = async () => {
  const dataDirectory = path.join(process.cwd(), 'public/data');
  const filenames = await fs.readdir(dataDirectory);

  // get json files in public/data, parse them, and add to an array
  const data = filenames.map(async (filename) => {
    const filePath = path.join(dataDirectory, filename);
    const fileContents = await fs.readFile(filePath, 'utf8');
    const parsedData = JSON.parse(fileContents);

    return {
      ...parsedData,
    };
  });

  const fetchedData = await Promise.all(data);

  const englishData = fetchedData[0];
  const hindiData = fetchedData[1];

  return { englishData, hindiData };
};

describe('tests for index page', () => {
  test('if page renders correctly with default options', async () => {
    const { englishData, hindiData } = await getData();

    // use dummy image as next/image testing does not work with online images at the moment
    englishData['hero_1_image'] = '/img/uk-flag.png';
    hindiData['hero_1_image'] = '/img/uk-flag.png';

    render(<Index englishData={englishData} hindiData={hindiData} />);

    // test if title renders correctly
    const title = screen.getByText(
      'Delhi smog: How many cigarettes did you smoke this week?'
    );
    expect(title.textContent).toEqual(
      'Delhi smog: How many cigarettes did you smoke this week?'
    );

    // flag buttons should exist in dom
    expect(screen.getByTestId('ukFlagButton')).toBeInTheDocument();
    expect(screen.getByTestId('indiaFlagButton')).toBeInTheDocument();

    //city selector should be in dom
    expect(screen.getByTestId('citySelector')).toBeInTheDocument();
  });

  test('if language change button works correctly', async () => {
    const { englishData, hindiData } = await getData();

    // use dummy image as next/image testing does not work with online images at the moment
    englishData['hero_1_image'] = '/img/uk-flag.png';
    hindiData['hero_1_image'] = '/img/uk-flag.png';

    render(<Index englishData={englishData} hindiData={hindiData} />);

    // title should be english first
    expect(screen.getByTestId('articleTitle').textContent).toEqual(
      'Delhi smog: How many cigarettes did you smoke this week?'
    );

    // // change language
    user.click(screen.getByTestId('indiaFlagButton'));

    // // title should then be in hindi

    expect(screen.getByTestId('articleTitle').textContent).toEqual(
      'भारत: इस हफ़्ते आपने आपने कितनी सिगरेट पी हैं?'
    );

    // switch back to english and test
    user.click(screen.getByTestId('ukFlagButton'));

    expect(screen.getByTestId('articleTitle').textContent).toEqual(
      'Delhi smog: How many cigarettes did you smoke this week?'
    );
  });

  test('if city selector for aqi works', async () => {
    const { englishData, hindiData } = await getData();

    // use dummy image as next/image testing does not work with online images at the moment
    englishData['hero_1_image'] = '/img/uk-flag.png';
    hindiData['hero_1_image'] = '/img/uk-flag.png';

    render(<Index englishData={englishData} hindiData={hindiData} />);

    // default selected city is correct
    expect(screen.getByTestId('aqiCity').textContent).toEqual(
      'Air Quality Index of Ghaziabad'
    );

    expect(screen.getByTestId('aqiCiggs').textContent).toEqual(
      'Equivalent to smoking 12 cigarettes'
    );

    user.selectOptions(screen.getByTestId('citySelector'), ['Delhi']);

    expect(screen.getByTestId('aqiCity').textContent).toEqual(
      'Air Quality Index of Delhi'
    );

    expect(screen.getByTestId('aqiCiggs').textContent).toEqual(
      'Equivalent to smoking 10 cigarettes'
    );
  });

  test('if page is accessible', async () => {
    const { englishData, hindiData } = await getData();

    // use dummy image as next/image testing does not work with online images at the moment
    englishData['hero_1_image'] = '/img/uk-flag.png';
    hindiData['hero_1_image'] = '/img/uk-flag.png';

    waitFor(async () => {
      const { container } = render(
        <Index englishData={englishData} hindiData={hindiData} />
      );

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
