import React from 'react';
import {Line} from 'react-chartjs-2';
import { connect } from 'react-redux';

class WatchlistChart extends React.Component {

    createLabels = () => {
        if (this.props.selectedCard) {
            let results = this.props.selectedCard.recent_prices.map(price => {
                if (price.edition == "1st Edition" || price.edition == "Limited") {
                    return true
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
        let selectedItem = null
        if (this.props.watchlistToggle == "portfolios") {
            selectedItem = this.props.selectedPortfolio
        } else if (this.props.watchlistToggle == "cards") {
            selectedItem = this.props.selectedCard
        } 

        if (selectedItem) {
            let results = selectedItem.recent_prices.map(price => {
                if (price.edition == "1st Edition" || price.edition == "Limited") {
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
                    display: true,
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
                    display: true,
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
        let selectedItemName = null
        if (this.props.watchlistToggle == "portfolios" && this.props.selectedPortfolio) {
            selectedItemName = ("Portfolio: " + this.props.selectedPortfolio.name + " - ")
        } else if (this.props.watchlistToggle == "cards" && this.props.selectedCard) {
            selectedItemName = (this.props.selectedCard.name + " - ")
        } 
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
                display:true,
                text: `${selectedItemName}1st Edition Prices`,
                fontSize:20
                },
                legend:{
                display:false,
                position:'right'
                },
                scales: {
                    xAxes: [{
                        scaleLabel: {
                            display: true, 
                            labelString: "Hours Since Price Was Pulled"
                        }
                    }],
                    yAxes: [{
                        ticks: {
                            // Include a dollar sign in the ticks
                            callback: function(value, index, values) {
                                return '$' + value.toFixed(2);
                            },
                            
                            
                        }
                    }]
                }
            }}
            />
        </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        selectedCard: state.watchlist.selectedCard,
        watchlistToggle: state.watchlist.watchlistToggle,
        selectedPortfolio: state.watchlist.selectedPortfolio
    }
}
export default connect(mapStateToProps)(WatchlistChart)