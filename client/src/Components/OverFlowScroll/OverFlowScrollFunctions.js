import axios from 'axios';

const typeOfDataToRender = (
  type,
  id,
  setArrayToRender,
  setdeleteFeedbackIcon,
  setDeliveredCheckIcon,
  pendingOrDelivered
) => {
  switch (type) {
    case 'userService':
      axios.get(`/service/user/${id}`).then((res) => {
        res.data.forEach((obj) => (obj.User = false));
        setArrayToRender(res.data);
      });
      break;
    case 'donation':
      Promise.all([
        id[0] === 'all'
          ? axios.get('/donation')
          : axios.get(`/donation/user/${id[0]}`),
        id[1] === 'all'
          ? axios.get('/donation')
          : axios.get(`/donation/vdv/${id[1]}`),
      ]).then(([res1, res2]) => {
        const render = [res1.data, res2.data];
        const toRender = render[0].filter((obj1) =>
          render[1].some((obj2) => obj2.id === obj1.id)
        );
        let toRender2;
        if (pendingOrDelivered === 'Pending') {
          toRender2 = toRender.filter((don) => don.status === 'Pending');
          setDeliveredCheckIcon(true);
        } else if (pendingOrDelivered === 'Delivered') {
          toRender2 = toRender.filter((don) => don.status === 'Delivered');
          setDeliveredCheckIcon(false);
        }

        setArrayToRender(toRender2);
      });
      break;
    case 'feedback':
      Promise.all([
        id[0] === 'all'
          ? axios.get('/feedback')
          : axios.get(`/feedback/user/${id[0]}`),
        id[1] === 'all'
          ? axios.get('/feedback')
          : axios.get(`/feedback/vdv/${id[1]}`),
      ]).then(([res1, res2]) => {
        const render = [res1.data, res2.data];
        const toRender = render[0].filter((obj1) =>
          render[1].some((obj2) => obj2.id === obj1.id)
        );
        setdeleteFeedbackIcon(true);
        setArrayToRender(toRender);
      });

      break;
  }
};

const deleteFeedback = (id, setArrayToRender) => {
  axios.delete(`/feedback/${id}/delete`).then(() => {
    axios.get('/feedback').then((res) => setArrayToRender(res.data));
  });
};

const updateDonation = (id, setArrayToRender) => {
  axios.put(`/donation/${id}`).then(() => {
    axios.get('/donation').then((res) => setArrayToRender(res.data));
  });
};

export { typeOfDataToRender, deleteFeedback, updateDonation };
