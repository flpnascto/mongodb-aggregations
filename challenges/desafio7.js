db.movies.aggregate([
  { $match: { languages: "English" } },
  { $unwind: "$cast" },
  { $addFields: { imdbRating: "$imdb.rating" } },
  {
    $group: {
      _id: "$cast",
      sumRating: { $avg: { $sum: "$imdbRating" } },
      numeroFilmes: { $sum: 1 },
      // mediaIMDB: { $round: [{ $sum: "$imdbRating"}, 1]}

    },
  },
  { $addFields: { mediaIMDB: { $round: ["$sumRating", 1] } } },
  { $sort: { numeroFilmes: -1, _id: -1 } },
  {
    $project: {
      _id: 1,
      numeroFilmes: 1,
      mediaIMDB: 1,
    },
  },
]);
