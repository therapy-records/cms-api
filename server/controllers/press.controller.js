// import Press from '../models/press.model';

const mockPress = [
  {
    copy: 'Getting to know Fiona Ross',
    author: 'Jazz Voices',
    href: 'https://www.jazzvoices.org/about',
    thumbUrl: 'jazzvoices.jpg'
  },
  {
    copy: 'JAZZ INTERVIEW les mardi et jeudi à 14h. Luke Seabright rencontre la chanteuse...',
    author: 'Art District Radio',
    href: 'http://artdistrict-radio.com/index.php/podcasts/jazz-interview-rencontre-la-chanteuse-de-jazz-fiona-ross-426',
    thumbUrl: 'artdistrictradio.jpg'
  },
  {
    copy: 'FIONA ROSS. Jazz vocalist,songwriter,performer and producer',
    author: 'Jonathan Sketch Sketcher',
    href: 'https://www.facebook.com/notes/jonathan-sketch-sketcher/fiona-ross-jazz-vocalistsongwriterperformer-and-producer/10154484207861266/',
    thumbUrl: 'jonathansketchsketcher.jpg'
  },
  {
    copy: 'FEATURE/INTERVIEW Fiona Ross (New album Just Me And Sometimes Someone Else)',
    author: 'London Jazz News',
    href: 'http://www.londonjazznews.com/2017/07/feature-interview-fiona-ross-new-album.html',
    thumbUrl: 'londonjazznews.jpg'
  },
];

/**
 * Get all news articles
 * @returns {press[]}
 */
function getAllArticles(req, res) {
  res.json(mockPress);
}


export default {
  getAllArticles,
};
