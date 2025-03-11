import type { _fileInfo, storages, storagesNames } from '@/_types/_fileInfo'
import type { AnimeListItem } from '@/_types/_filePageItem'
import { makeQuery } from '@/helpers/makeQuery'
import { defineStore } from 'pinia'

export const useFilesStore = defineStore('fileStore', {
  state: () => {
    return {
      files: {
        db: [],
        local: [],
      } as storages,
      currentlyViewed: undefined as AnimeListItem[] | undefined,
      status: 'loading' as 'loading' | 'done' | 'error',
      isEmpty: false,
    }
  },
  actions: {
    async loadFiles() {
      this.status = 'loading'
      try {
        const res = await makeQuery('/saved')
        if (!res || !res.data || !res.data[0]) {
          throw new Error('Response is undefined or invalid')
        }
        const filesStores: storagesNames = res.data[0].files
        await Promise.all(
          filesStores.db.map(async (name) => {
            const fileRes = await makeQuery(`/saved/${name.replace('.json', '')}`)
            if (!fileRes) {
              throw new Error('fileRes is undefined')
            }
            const fileResData = fileRes.data[0]
            return fileResData.meta
          }),
        ).then((arr: _fileInfo[]) => {
          if (arr.length <= 0) {
            this.isEmpty = true
          }
          this.files.db = arr
          this.status = 'done'
        })
        await Promise.all(
          filesStores.local.map(async (name) => {
            const fileRes = await makeQuery(`/saved/${name.replace('.json', '')}`)
            if (!fileRes) {
              throw new Error('fileRes is undefined')
            }
            const fileResData = fileRes.data[0]
            return fileResData.meta
          }),
        ).then((arr: _fileInfo[]) => {
          if (arr.length <= 0) {
            this.isEmpty = true
          }
          this.files.local = arr
          this.status = 'done'
        })
      } catch (error) {
        // let the form component display the error
        this.status = 'error'
        console.log(error)

        return error
      } finally {
      }
    },
    async loadFile(name: string, fromStorage: 'db' | 'local' = 'local') {
      this.status = 'loading'
      try {
        const fileRes = await makeQuery(
          `/saved/${name.replace('.json', '')}?storage=${fromStorage}`,
        )
        if (!fileRes) {
          throw new Error('fileRes is undefined')
        }
        const fileResDataMeta = fileRes.data[0].meta
        if (fromStorage === 'local') {
          const filtered = this.files.local.filter((item) => item.name !== name)
          this.files.local = [...filtered, fileResDataMeta]
        } else {
          const filtered = this.files.db.filter((item) => item.name !== name)
          this.files.db = [...filtered, fileResDataMeta]
        }
      } catch (error) {
        // let the form component display the error
        this.status = 'error'
        return error
      } finally {
        this.status = 'done'
      }
    },
    setCurrentlyViewed(animeList?: AnimeListItem[]) {
      this.status = 'loading'
      this.currentlyViewed = []
      this.currentlyViewed = animeList
      this.status = 'done'
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
