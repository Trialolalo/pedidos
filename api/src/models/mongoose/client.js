module.exports = (mongoose) => {
  const schema = mongoose.Schema(
    {
      name: String,
      surname: String,
      email: String,
      phone: String,
      order: Number,
      locales: {
        type: Map,
        of: mongoose.Schema.Types.Mixed
      },
      images: {
        type: Map,
        of: mongoose.Schema.Types.Mixed
      },
      deletedAt: Date
    },
    { timestamps: true }
  )

  const Client = mongoose.model('Client', schema, 'clients')
  return Client
}
