const gigsByYearReducer = (gigs) => {
  const mapped = [];

  gigs.forEach((gig) => {
    const gigYear = new Date(gig.date).getFullYear();

    const mappedYear = mapped.find(obj => obj.year === gigYear);
    if (mappedYear) {
      mappedYear.gigs.push(gig);
    } else {
      mapped.push({
        year: gigYear,
        gigs: [gig]
      });
    }
  });

  return mapped;
};

module.exports = gigsByYearReducer;
