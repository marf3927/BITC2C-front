import React from 'react'
import {Button, Divider, Form, Grid, Icon, Message, Segment} from 'semantic-ui-react'

const DividerExampleVerticalForm = () => (
    <Grid columns='equal' divided inverted padded>
        <Grid.Row color='black' textAlign='center'>
            <Grid.Column>
                <Segment color='black' inverted>
                    <Message icon>
                        <Icon name='circle notched' loading />
                        <Message.Content>
                            <Message.Header>지갑 암호를 넣어주세요</Message.Header>
                            Please enter your wallet address.
                        </Message.Content>
                    </Message>
                </Segment>
            </Grid.Column>


        </Grid.Row>
    </Grid>

)

export default DividerExampleVerticalForm