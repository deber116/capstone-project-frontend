import React from 'react';
import {Line} from 'react-chartjs-2';
import { connect } from 'react-redux';

class WatchlistChart extends React.Component {

    createLabels = () => {
        if (this.props.selectedCard) {
            let results = this.props.selectedCard.recent_prices.map(price => {
                if (price.edition == "1st Edition") {
                    return price.created_at
                } 
                return null
            })

            results = results.filter(cdate => {
                return cdate
            })

            let counter = results.length + 1
            results = results.map(label => {
                counter -= 1
                return `${counter}`
            })

            return results

        } else {
            return []
        }

    }

    createData = () => {
        if (this.props.selectedCard) {
            let results = this.props.selectedCard.recent_prices.map(price => {
                if (price.edition == "1st Edition") {
                    return price.amount
                } 
                return null
            })

            results = results.filter(amount => {
                return amount
            })

            return [
                {
                    label: '1st Edition Price',
                    fill: true,
                    lineTension: 0,
                    backgroundColor: 'rgba(75,192,192,1)',
                    borderColor: 'rgba(0,0,0,1)',
                    borderWidth: 2,
                    data: results
                }
            ]

        } else {
            return [
                {
                    label: '1st Edition Price',
                    fill: true,
                    lineTension: 0,
                    backgroundColor: 'rgba(75,192,192,1)',
                    borderColor: 'rgba(0,0,0,1)',
                    borderWidth: 2,
                    data: []
                }
            ]
        }

    }

    render() {
        return (
        <div>
            <Line
            data={{
                labels: this.createLabels(),
                datasets: this.createData()
            }}
            width={300}
            height={70}
            options={{
                title:{
                display:false,
                text:'Average Rainfall per month',
                fontSize:20
                },
                legend:{
                display:false,
                position:'right'
                }
            }}
            />
        </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        selectedCard: state.watchlist.selectedCard
    }
}
export default connect(mapStateToProps)(WatchlistChart)