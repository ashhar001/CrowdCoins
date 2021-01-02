import React, { Component } from 'react';
import { Card, Grid, Button } from 'semantic-ui-react';
import Layout from '../../components/Layout';
import Campaign from '../../ethereum/campaign';
import web3 from '../../ethereum/web3';
import ContributeForm from '../../components/ContributeForm';
import { Link } from '../../routes';

class CampaignShow extends Component {

    static async getInitialProps(props) {

        // //is the actial address of the capaign that we are tryn to show to the user(already deployed contract)
        const campaign = Campaign(props.query.address);
        
        const summary = await campaign.methods.getSummary().call();

        return {
            address: props.query.address,   //getting address to contributeform.js
            minimumContribution: summary[0],
            balance: summary[1],
            requestsCount: summary[2],
            approversCount: summary[3],
            manager: summary[4],
            
        };
    }

    renderCards() {

        const {

          balance,
          manager,
          minimumContribution,
          requestsCount,
          approversCount
          
        } = this.props;


        const items = [
          {
              header: manager,
              meta: 'Address of Manager',
              description:  'The Manager created this Campaign and can create requests to withdraw money.',
              style: { overflowWrap: 'break-word' }
          },
          {
            header: minimumContribution,
            meta: 'Minimum Contribution (wei)',
            description:  'You must Contribute atleast this much WEI to to become a approver.',
            style: { overflowWrap: 'break-word' }
          },

          {
            header: requestsCount,
            meta: 'Number of Requests',
            description:  'A Requests tries to withdraw money from the contract. Requests must be approved by the approvers.',
            style: { overflowWrap: 'break-word' }
          },
          {
            header: approversCount,
            meta: 'Numbers of Approvers',
            description:  'Number of people who have already donated to this Campaign',
            style: { overflowWrap: 'break-word' }
          },
          {
            header: web3.utils.fromWei(balance,'ether'),
            meta: 'Campaign Balance (ETHER)',
            description:  'The Balance is how much money this Campaign has left to spend.',
            style: { overflowWrap: 'break-word' }
          }
        ];

        return <Card.Group items = { items } />
    }



    render() {
        return (
            <Layout>
                <h3>Campaign Show</h3>

                <Grid>
                  <Grid.Row>
                    <Grid.Column width = { 10 }>
                        { this.renderCards() }
                        
                    </Grid.Column>

                    <Grid.Column width={ 6 }>
                        <ContributeForm address = { this.props.address }/>
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row>
                    <Grid.Column>
                      <Link route={ `/campaigns/${ this.props.address }/requests`}>

                      <a>
                        <Button primary>View Requests</Button>
                      </a>

                      </Link>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
                
            </Layout>
        );
    }
}

export default CampaignShow;