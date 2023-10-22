const {
  AZURE_KEY_VAULT_TIMESTAMP_URL,
  AZURE_KEY_VAULT_ACCESS_TOKEN,
  AZURE_KEY_VAULT_URL,
  AZURE_KEY_VAULT_CERTIFICATE_NAME,
} = process.env

Object.entries({
  AZURE_KEY_VAULT_TIMESTAMP_URL,
  AZURE_KEY_VAULT_ACCESS_TOKEN,
  AZURE_KEY_VAULT_URL,
  AZURE_KEY_VAULT_CERTIFICATE_NAME,
}).forEach(([key, value]) => {
  if (!value) throw new Error(`Missing environment variable ${key}`)
})

const { execSync } = require('child_process')

const sign = async ({ path }) => {
  execSync(
    [
      'AzureSignTool',
      'sign',
      `-kva ${AZURE_KEY_VAULT_ACCESS_TOKEN}`,
      `-kvu ${AZURE_KEY_VAULT_URL}`,
      `-kvc ${AZURE_KEY_VAULT_CERTIFICATE_NAME}`,
      `-tr ${AZURE_KEY_VAULT_TIMESTAMP_URL}`,
      path,
    ].join(' '),
    { stdio: 'inherit' }
  )
}

exports.default = sign
