import React from 'react'
import { BrowserRouter, Route, Switch as SwitchRoute } from 'react-router-dom'
import FuseNavbar from '../components/FuseNavbar/FuseNavbar'
import AnalysisPage from '../pages/AnalysisPage/AnalysisPage'
import AuthorizationPage from '../pages/AuthorizationPage/AuthorizationPage'
import NotFound from '../pages/ErrorsPage/NotFound'
import HomePage from '../pages/HomePage/HomePage'
import LazOrderPage from '../pages/LazOrderPage/LazOrderPage'
import LocalBillPage from '../pages/LocalBillPage/LocalBillPage'
import LocalNewpublishBillPage from '../pages/LocalNewpublishBillPage/LocalNewpublishBillPage'
import ProductNewpublishPage from '../pages/ProductNewpublishPage/ProductNewpublishPage'
import ProductPage from '../pages/ProductPage/ProductPage'
import ProductUpdatePage from '../pages/ProductUpdatePage/ProductUpdatePage'
import PurchaseBill from '../pages/PurchaseBill'
import PurchaseOrder from '../pages/PurchaseOrder/'
import RecivedNotePage from '../pages/RecivedNotePage/'

const LoggedRoute = (props) => {
    return (
        <BrowserRouter>
        <FuseNavbar multiTheme={props.multiTheme}>
          <SwitchRoute>
            <Route exact path="/" render={() => <HomePage/>} />
            <Route exact path="/warehouse/purchase-order/portal" render={() => <PurchaseOrder/>} />
            <Route exact path="/warehouse/grn/portal" render={() => <RecivedNotePage/>} />
            <Route exact path="/warehouse/bill/portal" render={() => <PurchaseBill/>} />
            <Route exact path="/product/portal" render={() => <ProductPage/>} />
            <Route exact path="/product/newpublish" render={() => <ProductNewpublishPage/>} />
            <Route path="/product/:product_id" component={ProductUpdatePage} />
            <Route exact path="/laz-order" render={() => <LazOrderPage/>} />
            <Route exact path="/order-local/newpublish" render={() => <LocalNewpublishBillPage/>} />
            <Route exact path="/order-local/portal" render={() => <LocalBillPage/>} />
            <Route exact path="/analysis" render={() => <AnalysisPage/>} />
            <Route exact path="/authorization" render={() => <AuthorizationPage/>} />
            <Route component={NotFound} />
          </SwitchRoute>
        </FuseNavbar>
        </BrowserRouter>
    )
}

export default LoggedRoute
