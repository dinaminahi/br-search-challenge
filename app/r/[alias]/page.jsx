// import { SearchPage } from '@/modules/search/components/SearchPage'
import { getRetreat } from '@/modules/search/actions'
import { RetreatPage } from '@/modules/search/components/RetreatPage';

export default async ({ params }) => {
  const urlData = await params;

//   console.log(urlData.alias);

  const { data } = await getRetreat({ slug: urlData.alias })
//   console.log(data);

  return (
    <RetreatPage retreatData={data} />
  )
}