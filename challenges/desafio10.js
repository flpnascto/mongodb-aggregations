db.trips.aggregate([
  {
    $addFields: {
      totalTime: { $subtract: ["$stopTime", "$startTime"] },
    },
  },
  {
    $group: {
      _id: "$usertype",
      avgTime: {
        $avg: {
          $sum: {
            $divide: ["$totalTime", 60 * 60 * 1000],
          },
        },
      },
    },
  },
  { $sort: { avgTime: 1 } },
  {
    $project: {
      _id: 0,
      tipo: "$_id",
      duracaoMedia: { $round: ["$avgTime", 2] },
    },
  },
]);
