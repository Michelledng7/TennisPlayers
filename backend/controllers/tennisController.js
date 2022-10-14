const getTennis = (req, res) => {
	res.status(200).json({ message: 'Hello tennis players!' });
};

const createTennis = (req, res) => {
	res.status(200).json({ message: 'create!' });
};

const updateTennis = (req, res) => {
	res.status(200).json({ message: `update ${req.params.id}` });
};

const deleteTennis = (req, res) => {
	res.status(200).json({ message: `delete ${req.params.id}` });
};

module.exports = { getTennis, createTennis, updateTennis, deleteTennis };
