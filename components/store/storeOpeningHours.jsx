import { List } from 'semantic-ui-react'

const StoreOpeningHours = ({ openingHours }) => {
  const hoursJson = JSON.parse(openingHours)

  return (
    <List style={{paddingTop: 0}}>
      {
        Object.keys(hoursJson).map((key) => {
          return (
            <List.Item key={key}>
              <List.Content>
                <List.Header>
                  {key}
                </List.Header>
                <List.Description>
                  {
                    Array.isArray(hoursJson[key]) ? (
                      hoursJson[key].map(({startTime, endTime}) => {
                        return (
                          <span key={startTime} style={{marginRight: 12}}>
                            {startTime} ~ {endTime}
                          </span>
                        )
                      })
                    ) : hoursJson[key]
                  }
                </List.Description>
              </List.Content>
            </List.Item>
          )
        })
      }
    </List>
  )
}

export default StoreOpeningHours