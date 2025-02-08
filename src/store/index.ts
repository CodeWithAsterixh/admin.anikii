import type { _fileInfo } from '@/_types/_fileInfo'
import { makeQuery } from '@/helpers/makeQuery'
import { defineStore } from 'pinia'

export const useFilesStore = defineStore('fileStore', {
  state: () => {
    return {
      files: [] as _fileInfo[],
    }
  },
  actions: {
    async loadFiles() {
      try {
        const res = await makeQuery('/listTmp')
        const fileNames: string[] = res.data[0].files
        await Promise.all(
          fileNames.map(async (name) => {
            const fileRes = await makeQuery(`/listTmp/${name.replace('.json', '')}`)
            const fileResData = fileRes.data[0]
            return fileResData.meta
          }),
        ).then((arr: _fileInfo[]) => {
          this.files = arr
        })
      } catch (error) {
        // let the form component display the error
        return error
      }
    },
  },
})
export const useAccess = defineStore('access', {
  state: () => {
    return {
      isAdmin: true,
    }
  },
})
