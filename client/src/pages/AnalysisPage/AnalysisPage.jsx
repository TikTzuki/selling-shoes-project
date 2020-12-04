import React from 'react'
import AnalysisPayoutComp from '../../components/AnalysisPayoutComp/AnalysisPayoutComp'
import AnalysisRevenueComp from '../../components/AnalysisRevenueComp/AnalysisRevenueComp';

const AnalysisPage = (props) => {
    const { match } = props;

    return (
        <div>
            <AnalysisComp type={match.params.type} />
        </div>)
}

const AnalysisComp = (props) => {
    const { type } = props;
    switch (type) {
        case "payout-status":
            return <AnalysisPayoutComp />
        case "revenue":
            return <AnalysisRevenueComp />
        default:
            return <AnalysisPayoutComp />
    }
}

export default AnalysisPage