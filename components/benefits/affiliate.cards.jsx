import React, { useState } from 'react'
import moment from 'moment'
import { Card, Modal, Grid, Header } from 'semantic-ui-react'

const AffiliateCards = ({affiliates}) => {
  const initialFlags = Array.from({ length: affiliates.length }, () => false);
  const [flags, setFlags] = useState(initialFlags);
  const toggleFlag = (index) => {
    setFlags(prevFlags => {
      const newFlags = [...prevFlags];
      newFlags[index] = !newFlags[index];
      return newFlags;
    });
  };
  
  return (
    <Grid stackable columns={4} >
    {
      affiliates.map((affiliate, idx) =>
      <Grid.Column key={idx}>
        <Modal
          closeIcon
          open={flags[idx]}
          trigger={
            <Card color='pink' style={{minHeight:"160px"}}>
              <Card.Content>
                <Card.Header>{affiliate.title}</Card.Header>
                <Card.Description>
                  {affiliate.content_short}
                </Card.Description>
              </Card.Content>
            </Card>
          }
          onClose={() => toggleFlag(idx)}
          onOpen={() => toggleFlag(idx)}
        >
          <Header icon='paperclip' content={affiliate.title} />
          <Modal.Content>
            <p style={{ whiteSpace: "pre-line" }}>
              {affiliate.content}
            </p>
          </Modal.Content>
        </Modal>
      </Grid.Column>
      )
    }
    </Grid>
  )
}

export default AffiliateCards