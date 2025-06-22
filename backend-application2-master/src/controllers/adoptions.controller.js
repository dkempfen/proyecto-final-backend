const adoptionsMock = [
  { _id: '1', user: 'User A', pet: 'Pet X' },
  { _id: '2', user: 'User B', pet: 'Pet Y' }
];

const adoptionsController = {
    
  getAllAdoptions: (req, res) => {
    res.status(200).json(adoptionsMock);
  },

  getAdoption: (req, res) => {
    const { aid } = req.params;
    const adoption = adoptionsMock.find(a => a._id === aid);

    if (!adoption) {
      return res.status(404).json({ error: 'No se encontró la adopción solicitada' });
    }

    res.status(200).json(adoption);
  },

  createAdoption: (req, res) => {
    const { uid, pid } = req.params;

    if (!uid || !pid) {
      return res.status(400).json({ error: 'Faltan parámetros uid o pid' });
    }

    const newAdoption = {
      _id: Date.now().toString(), 
      user: `Usuario con ID ${uid}`,
      pet: `Mascota con ID ${pid}`
    };

    adoptionsMock.push(newAdoption);

    res.status(201).json({
      message: 'Adopción procesada exitosamente',
      adoption: newAdoption,
      adoptionId: newAdoption._id
    });
  }
};

export default adoptionsController;
