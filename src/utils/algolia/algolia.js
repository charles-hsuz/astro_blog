
import algoliasearch from 'algoliasearch'

const client = algoliasearch('GUTUE9VZX9', 'bc2683f16de3c655b148871ef408c300')


const index = client.initIndex()

index.saveObject(records).wait()

// Search the index and print the results
index
  .search('test_record')
  .then(({ hits }) => console.log(hits[0]))