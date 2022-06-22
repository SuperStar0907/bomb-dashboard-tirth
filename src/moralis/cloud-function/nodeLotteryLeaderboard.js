Moralis.Cloud.beforeSaveFile((request) => {
  throw "Not Allowed";
});

Moralis.Cloud.define("nodeLotteryLeaderboard", async (request) => {
  let start = new Date(request.params.start).toISOString();
  let end = new Date(request.params.end).toISOString();
  let limit = request.params.limit;
  let table = request.params.table;
  let entries = request.params.entries;
  let wallet = request.params.wallet;

  const pfilterAnd = [
    { $gte: ["$_created_at", { "$toDate": start }] },
    { $lte: ["$_created_at", { "$toDate": end }] }
  ];
  if (wallet) {
    pfilterAnd.push({ $eq: ["$account", wallet ] });
  }

  const pfilter = {
    match: {
      $expr: {
        $and: pfilterAnd
      }
    }
  };
  const pgroup = { group: { objectId: "$account", total: { $sum: entries } } };
  const psort = { sort : { total: -1 } };
  const plimit = { limit: limit };
  const pipeline = [pfilter, pgroup, psort, plimit];

  const query = new Moralis.Query(table);
  return await query.aggregate(pipeline, { useMasterKey: true });
});
