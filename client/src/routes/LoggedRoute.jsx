import React from 'react'
import { BrowserRouter, Route, Switch as SwitchRoute } from 'react-router-dom'
import FuseNavbar from '../components/FuseNavbar/FuseNavbar'
import AnalysisPage from '../pages/AnalysisPage/AnalysisPage'
import AuthorizationPage from '../pages/AuthorizationPage/AuthorizationPage'
import NotFound from '../pages/ErrorsPage/NotFound'
import HomePage from '../pages/HomePage/HomePage'
import LazOrderPage from '../pages/LazOrderPage/LazOrderPage'
import LocalBillDetailsPage from '../pages/LocalBillDetailsPage/LocalBillDetailsPage'
import LocalBillPage from '../pages/LocalBillPage/LocalBillPage'
import LocalNewpublishBillPage from '../pages/LocalNewpublishBillPage/LocalNewpublishBillPage'
import ProductNewpublishPage from '../pages/ProductNewpublishPage/ProductNewpublishPage'
import ProductPage from '../pages/ProductPage/ProductPage'
import ProductUpdatePage from '../pages/ProductUpdatePage/ProductUpdatePage'
import PurchaseBill from '../pages/PurchaseBill'
import PurchaseOrder from '../pages/PurchaseOrder/'
import RecivedNotePage from '../pages/RecivedNotePage/'
import UserPage from '../pages/UserPage/UserPage'

const LoggedRoute = (props) => {
    return (
        <BrowserRouter>
        <FuseNavbar multiTheme={props.multiTheme}>
          <SwitchRoute>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/warehouse/purchase-order/portal" component={PurchaseOrder} />
            <Route exact path="/warehouse/grn/portal" component={RecivedNotePage} />
            <Route exact path="/warehouse/bill/portal" component={PurchaseBill} />
            <Route exact path="/product/portal" component={ProductPage} />
            <Route exact path="/product/newpublish" component={ProductNewpublishPage} />
            <Route exact path="/product/:product_id" component={ProductUpdatePage} />
            <Route exact path="/laz-order" component={LazOrderPage} />
            <Route exact path="/order-local/newpublish" component={LocalNewpublishBillPage} />
            <Route exact path="/order-local/portal" component={LocalBillPage} />
            <Route exact path="/order-local/detail/:bill_id" component={LocalBillDetailsPage} />
            <Route exact path="/analysis" component={AnalysisPage} />
            <Route exact path="/authorization" component={AuthorizationPage} />
            <Route exact path="/my-account" component={UserPage} />
            <Route component={NotFound} />
          </SwitchRoute>
        </FuseNavbar>
        </BrowserRouter>
    )
}

export default LoggedRoute
