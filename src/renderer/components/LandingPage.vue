<template>
  <div id="wrapper">
    <el-input type="file" @change="inputFile" ref="inputFile">选择文件</el-input>
    <div class="content">
      {{ fileContent }}
    </div>

    <h1>To Do List</h1>
    <div>
      <el-input type="text" v-model="inputText" @keyup.native="inputKeyUp"/>
      <el-button type="success" @click.native="addToDoList">添加</el-button>
    </div>

    <div>
      <h2>待办事项</h2>
      <ul>
        <li v-for="(item, key) in toDoList" :key="key" v-if="!item.finish">
          {{ item.title }}
          <el-checkbox v-model="item.finish"></el-checkbox>
        </li>
      </ul>

      <br/><br/><br/><hr/><br/><br/><br/>
      <h2>完成</h2>
      <ul>
        <li v-for="(item, key) in toDoList" :key="key" v-if="item.finish">
          {{ item.title }}
          <el-checkbox v-model="item.finish"></el-checkbox>
        </li>
      </ul>
    </div>

  </div>
</template>

<script>
  import SystemInformation from './LandingPage/SystemInformation'
  import storage from '../../utils/storage'
  const fs = require('fs')

  export default {
    name: 'landing-page',
    components: { SystemInformation },
    data () {
      return {
        fileContent: '',
        toDoList: [],
        inputText: ''
      }
    },
    methods: {
      open (link) {
        require('electron').shell.openExternal(link)
      },
      inputFile (e) {
        this.filePath = this.$refs.inputFile.$refs.input.files[0].path
        console.log('input', this.filePath)
        this.fileContent = fs.readFileSync(this.filePath, 'utf-8')
      },
      inputKeyUp (e) {
        console.log('inputKeyUp', e)
        if (e.keyCode === 13) {
          this.addToDoList()
        }
      },
      addToDoList () {
        if (!this.inputText) {
          this.$alert('待办事项不能为空', '提醒', {
            confirmButtonText: 'OK'
          })
          return
        }
        let toDoItem = {
          title: this.inputText,
          finish: false
        }
        this.inputText = ''
        this.toDoList.push(toDoItem)
      }
    },
    updated () {
      storage.set('toDoList', this.toDoList)
    },
    created () {
      this.toDoList = storage.get('toDoList') || []
      console.log('created', this.toDoList)
    }
  }
</script>

<style>
  @import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro');

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body { font-family: 'Source Sans Pro', sans-serif; }

  #wrapper {
    background:
      radial-gradient(
        ellipse at top left,
        rgba(255, 255, 255, 1) 40%,
        rgba(229, 229, 229, .9) 100%
      );
    height: 100vh;
    padding: 60px 80px;
    width: 100vw;
  }

  #logo {
    height: auto;
    margin-bottom: 20px;
    width: 420px;
  }

  main {
    display: flex;
    justify-content: space-between;
  }

  main > div { flex-basis: 50%; }

  .left-side {
    display: flex;
    flex-direction: column;
  }

  .welcome {
    color: #555;
    font-size: 23px;
    margin-bottom: 10px;
  }

  .title {
    color: #2c3e50;
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 6px;
  }

  .title.alt {
    font-size: 18px;
    margin-bottom: 10px;
  }

  .doc p {
    color: black;
    margin-bottom: 10px;
  }

  .doc button {
    font-size: .8em;
    cursor: pointer;
    outline: none;
    padding: 0.75em 2em;
    border-radius: 2em;
    display: inline-block;
    color: #fff;
    background-color: #4fc08d;
    transition: all 0.15s ease;
    box-sizing: border-box;
    border: 1px solid #4fc08d;
  }

  .doc button.alt {
    color: #42b983;
    background-color: transparent;
  }
</style>
