const smartgrid = require('smart-grid');

const settings = {
  columns: 12,
  offset: '30px',
  container: {
    maxWidth: '1110px',
    fields: '30px'
  }
};

smartgrid('./src/precss', settings);
