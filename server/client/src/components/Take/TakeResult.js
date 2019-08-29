import React from 'react';


class TakeResult extends React.Component {

    
    render() {
        return (
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-12">
                <h3>Code Taken:</h3>
                <ul>
                    {Object.entries(this.props.location.state.codes).map(kv=>{return(
                        <div key={kv[0]}>
                            ProjectItem: {kv[1][1]}
                            <ul>
                                {kv[1][0].map(item=><li key={item}>{item}</li>)}
                            </ul>
                        </div>
                        
                    )})}
                </ul>
              </div>
            </div>
          </div>
        );
      }
   
}

export default TakeResult;