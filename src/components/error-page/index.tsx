import Error, { ErrorProps } from 'next/error'
import DashboardLayout from '@/components/layout/dashboard-layout'

function ErrorPage(props: ErrorProps) {
  return (
    <DashboardLayout>
      <Error {...props}/>
    </DashboardLayout>
  )
}

export default ErrorPage