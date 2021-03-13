import React from 'react';

const NotFound = () => (

  <div className="main-content not-found">
    {/* svg borrowed from  https://equitable.com/404 */}
    <div>
      <img height="100rem"  src={require("../images/404.svg")} alt="Not Found..." />
    </div>
    <h2 >Oops, there was a problem</h2>
    <h4 >The page was not found</h4>
    <p >The link to this page may be broken or has been removed.</p>
  </div>

);

export default NotFound;