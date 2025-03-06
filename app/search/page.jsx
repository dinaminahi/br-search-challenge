import { SearchPage } from '@/modules/search/components/SearchPage'
import { searchRetreats } from '@/modules/search/actions'

export default async ({ searchParams }) => {
  const params = await searchParams

  const { data } = await searchRetreats({ params })

  return (
    <SearchPage {...data} />
  )
}
