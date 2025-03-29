import express from 'express';
import cors from 'cors';
import puppeteer from 'puppeteer';

const app = express();
app.use(cors());

app.get('/search-medicine', async (req, res) => {
  const { medicineName } = req.query;

  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(`https://www.google.com/search?q=${medicineName}+price+site:netmeds.com`);

    const results = await page.evaluate(() => {
      let prices = Array.from(document.querySelectorAll('.price-tag')).map(el => el.innerText);
      let images = Array.from(document.querySelectorAll('.product-image')).map(el => el.src);
      return prices.map((price, index) => ({
        price,
        image: images[index]
      }));
    });

    await browser.close();
    res.json(results);
  } catch (error) {
    console.error('Error searching medicine:', error);
    res.status(500).json({ error: 'Failed to search for medicine' });
  }
});

app.listen(3001, () => {
  console.log('Server is running on port 3001');
}); 