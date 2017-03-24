/**
 * Created by antoniogiordano on 24/03/17.
 */

module.exports = [
  // DASHBOARD PAGE
  {
    method: 'GET',
    path: '/',
    config: {
      handler: (req, reply) => {
        var props = {}
        reply.view('dashboard/dashboard.ejs', {
          props: JSON.stringify(props)
        })
      }
    }
  },
]