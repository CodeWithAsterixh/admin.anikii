export interface _fileInfo {
  /** file size as number @in kb (kilobyte)  */
  file_size: number
  creation_time: string
  modification_time: string
  access_time: string
  name: string
  type: 'json'
  pages: number
  total: number
  thumbnail: string | null
  from: 'temp' | 'db'
}

export interface storages {
  db: _fileInfo[]
  local: _fileInfo[]
}

export interface storagesNames {
  db: string[]
  local: string[]
}
